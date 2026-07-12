import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";

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

  // =======================
// Generate Image (ClipDrop)
// =======================

export const generateImage = async (req, res)=>{
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if(plan !== 'premium'){
      return res.json({ success: false, message: "This feature is only available for premium subscriptions"})
    }

    const formData = new FormData()
    formData.append('prompt', prompt)
    const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1",
      formData, {
        headers: {'x-api-key': process.env.CLIPDROP_API_KEY,},
        responseType: "arraybuffer",
      }
    )

    const base64Image = 'data:image/png;base64,${Buffer.form(data,'binary').
    toString('base64')}';

  } catch (error) {
    
  }
}
};