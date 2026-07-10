import { GoogleGenAI } from "@google/genai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Generate Article

export const generateArticle = async (req, res) => {
  try {
    const userId = req.userId;
    const { prompt, length } = req.body;

    const plan = req.plan;
    const free_usage = req.free_usage;

    // Validate Input
    if (!prompt || !length) {
      return res.status(400).json({
        success: false,
        message: "Prompt and length are required.",
      });
    }

    // Free plan limit
    if (plan !== "premium" && free_usage >= 10) {
      return res.status(403).json({
        success: false,
        message: "Free usage limit reached. Upgrade to Premium.",
      });
    }

    console.log("========== GEMINI REQUEST ==========");
    console.log({
      userId,
      prompt,
      length,
      model: "gemini-3.5-flash",
    });
    console.log("====================================");

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Write a professional article of approximately ${length} words on the topic:

${prompt}`,
    });

    console.log("========== GEMINI RESPONSE ==========");
    console.dir(response, { depth: null });
    console.log("=====================================");

    const content = response.text;

    if (!content || content.trim() === "") {
      return res.status(500).json({
        success: false,
        message: "Gemini returned an empty response.",
      });
    }

    // Save to database
    await sql`
      INSERT INTO creations
      (user_id, prompt, content, type)
      VALUES
      (${userId}, ${prompt}, ${content}, 'article')
    `;

    // ===== Tutorial if statement =====
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    return res.status(200).json({
      success: true,
      content,
    });

  } catch (err) {

    console.log("\n========== GEMINI ERROR ==========\n");
    console.dir(err, { depth: null });

    console.log("\nMessage:");
    console.log(err.message);

    console.log("\nStack:");
    console.log(err.stack);

    console.log("\n==================================\n");

    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};

// Generate Blog Titles

export const generateBlogTitle = async (req, res) => {
  try {
    const userId = req.userId;
    const { prompt } = req.body;

    const plan = req.plan;
    const free_usage = req.free_usage;

    // Validate Input
    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required.",
      });
    }

    // Free plan limit
    if (plan !== "premium" && free_usage >= 10) {
      return res.status(403).json({
        success: false,
        message: "Free usage limit reached. Upgrade to Premium.",
      });
    }

    console.log("========== GEMINI REQUEST ==========");
    console.log({
      userId,
      prompt,
      model: "gemini-3.5-flash",
    });
    console.log("====================================");

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Generate 10 catchy, SEO-friendly blog titles about:

"${prompt}"

Rules:
- Return only the titles.
- Number each title.
- Do not add explanations.
- Keep each title under 70 characters.`,
    });

    const content = response.text;

    if (!content || content.trim() === "") {
      return res.status(500).json({
        success: false,
        message: "Gemini returned an empty response.",
      });
    }

    // Save to database
    await sql`
      INSERT INTO creations
      (user_id, prompt, content, type)
      VALUES
      (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

    // ===== Tutorial if statement =====
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    return res.status(200).json({
      success: true,
      content,
    });

  } catch (err) {

    console.log("\n========== GEMINI ERROR ==========\n");
    console.dir(err, { depth: null });

    console.log("\nMessage:");
    console.log(err.message);

    console.log("\nStack:");
    console.log(err.stack);

    console.log("\n==================================\n");

    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }

// Generate Image


  try {
    const userId = req.userId;
    const { prompt } = req.body;

    const plan = req.plan;
    const free_usage = req.free_usage;

    // Validate Input
    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required.",
      });
    }

    // Free plan limit
    if (plan !== "premium" && free_usage >= 10) {
      return res.status(403).json({
        success: false,
        message: "Free usage limit reached. Upgrade to Premium.",
      });
    }

    console.log("========== GEMINI IMAGE REQUEST ==========");
    console.log({
      userId,
      prompt,
      model: "imagen-4.0-generate-preview",
    });
    console.log("==========================================");

    // Generate Image
    const response = await ai.models.generateImages({
      model: "imagen-4.0-generate-preview",
      prompt,
      config: {
        numberOfImages: 1,
      },
    });

    const image = response.generatedImages?.[0]?.image?.imageBytes;

    if (!image) {
      return res.status(500).json({
        success: false,
        message: "Gemini returned an empty image.",
      });
    }

    // Convert Base64 → Data URL
    const imageUrl = `data:image/png;base64,${image}`;

    // Save to database
    await sql`
      INSERT INTO creations
      (user_id, prompt, content, type)
      VALUES
      (${userId}, ${prompt}, ${imageUrl}, 'image')
    `;

    // Increase free usage (same as tutorial)
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    return res.status(200).json({
      success: true,
      content: imageUrl,
    });

  } catch (err) {

    console.log("\n========== GEMINI IMAGE ERROR ==========\n");

    console.dir(err, { depth: null });

    console.log("\nMessage:");
    console.log(err.message);

    console.log("\nStack:");
    console.log(err.stack);

    console.log("\n========================================\n");

    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};