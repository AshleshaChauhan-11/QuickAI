import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import FormData from "form-data";
import connectCloudinary, { cloudinary } from "../configs/cloudinary.js";
import fs from 'fs'
import * as pdfParse from "pdf-parse";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const checkFreeUsage = (plan, free_usage) => {
  return plan !== "premium" && free_usage >= 10;
};

const incrementFreeUsage = async (userId, plan, free_usage) => {
  if (plan !== "premium") {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        free_usage: free_usage + 1,
      },
    });
  }
};

// =======================
// Generate Article
// =======================

export const generateArticle = async (req, res) => {
  try {
    const userId = req.userId;
    const { prompt, length } = req.body;

    const plan = req.plan;
    const free_usage = req.free_usage;

    if (!prompt || !length) {
      return res.status(400).json({
        success: false,
        message: "Prompt and length are required.",
      });
    }

    if (checkFreeUsage(plan, free_usage)) {
      return res.status(403).json({
        success: false,
        message: "Free usage limit reached. Upgrade to Premium.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Write a professional article of approximately ${length} words on the topic:

${prompt}`,
    });

    const content = response.text;

    if (!content?.trim()) {
      return res.status(500).json({
        success: false,
        message: "Gemini returned an empty response.",
      });
    }

    await sql`
      INSERT INTO creations
      (user_id, prompt, content, type)
      VALUES
      (${userId}, ${prompt}, ${content}, 'article')
    `;

    await incrementFreeUsage(userId, plan, free_usage);

    return res.status(200).json({
      success: true,
      content,
    });
  } catch (err) {
    console.error("Generate Article Error:");
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
}
};

// =======================
// Generate Blog Titles
// =======================

export const generateBlogTitle = async (req, res) => {
  try {
    const userId = req.userId;
    const { prompt } = req.body;

    const plan = req.plan;
    const free_usage = req.free_usage;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required.",
      });
    }

    if (checkFreeUsage(plan, free_usage)) {
      return res.status(403).json({
        success: false,
        message: "Free usage limit reached. Upgrade to Premium.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Generate 10 catchy, SEO-friendly blog titles about:

"${prompt}"

Rules:
- Return only the titles.
- Number each title.
- No explanations.
- Maximum 70 characters each.`,
    });

    const content = response.text;

    if (!content?.trim()) {
      return res.status(500).json({
        success: false,
        // message: "Gemini returned an empty response.",
      });
    }

    await sql`
      INSERT INTO creations
      (user_id, prompt, content, type)
      VALUES
      (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

    await incrementFreeUsage(userId, plan, free_usage);

    return res.status(200).json({
      success: true,
      content,
    });
    } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};

// Generate Image (ClipDrop)

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      "binary"
    ).toString("base64")}`;

    const { secure_url } = await connectCloudinary.uploader.upload(
      base64Image
    );

    await sql`
      INSERT INTO creations
      (user_id, prompt, content, type, publish)
      VALUES
      (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
    `;

    res.json({
      success: true,
      content: secure_url,
    });
  } catch (error) {
    console.log(error.message);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

//REMOVE IMAGE BACKGROUND

export const removeImageBackground = async (req, res)=>{
  try {
    const { userId } = req.auth();
    const { image } = req.file;
    const plan = req.plan;

    if(plan !== 'premium'){
      return res.json({ success: false, message: "This feature is only available for premium subscriptions"})
    }

    const {secure_url} = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: 'background_removal',
          background_removal: 'remove_the_background'
        }
      ]
    })

    await sql`
      INSERT INTO creations
      (user_id, prompt, content, type, publish)
      VALUES
      (${userId}, 'Remove background from image', ${secure_url}, 'image')
    `;

    res.json({ success: true, content: secure_url})
  } catch (error) {
    console.log(error.message)
    res.json({success: false, message: error.message});
  }
};

//REMOVE IMAGE OBJECT

export const removeImageObject = async (req, res)=>{
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const { image } = req.file;
    const plan = req.plan;

    if(plan !== 'premium'){
      return res.json({ success: false, message: "This feature is only available for premium subscriptions"})
    }

    const {public_id} = await cloudinary.uploader.upload(image.path)

    const imageUrl= cloudinary.url(public_id,{
      transformation: [{effect: 'gen_remove:${object}'}],
      resource_type: 'image'
    })
    await sql`
      INSERT INTO creations
      (user_id, 'Remove background from image', content, type, publish)
      VALUES
      (${userId}, ${'Removed ${object} from image'}, ${imageUrl}, 'image')
    `;

    res.json({ success: true, content: imageUrl})

  } catch (error) {
    console.log(error.message)
    res.json({success: false, message: error.message});
  }
};

//Review Resume

export const resumeReview = async (req, res)=>{
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;

    if(plan !== 'premium'){
      return res.json({ success: false, message: "This feature is only available for premium subscriptions"})
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({success: false, message: "Resume file size exceeds allowed size (5MB)."})
    }

    const dataBuffer = fs.readFileSync(resume.path)
    const pdfData = await pdf(dataBuffer)

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement.

Resume Content:

${pdfData.text}`;

    const response = await AI.chat.completions.create({
        model: "gemini-3.5-flash",
        messages: [{ role: "user", content: prompt, }],
        temperature: 0.7,
        max_tokens: 1000,
  });

    const content = response.choices[0].message.content

    await sql`
      INSERT INTO creations
      (user_id, 'Remove background from image', content, type, publish)
      VALUES
      (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')
    `;

    res.json({ success: true, content})

  } catch (error) {
    console.log(error.message)
    res.json({success: false, message: error.message});
  }
};