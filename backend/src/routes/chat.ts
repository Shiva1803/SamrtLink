import express from "express";
import { chatModel, embeddings } from "../config/openai";
import { Embedding } from "../models/Embedding";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

// Authenticated chat using token; userId from JWT
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId as string;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const userEmbeddings = await Embedding.find({ userId });

    let prompt = "";

    if (userEmbeddings.length > 0) {
      const queryVec = await embeddings.embedQuery(message);

      let bestMatch = userEmbeddings[0];
      let bestScore = -Infinity;

      for (const doc of userEmbeddings) {
        const dot = doc.embedding.reduce((sum, v, i) => sum + v * queryVec[i], 0);
        if (dot > bestScore) {
          bestScore = dot;
          bestMatch = doc;
        }
      }

      prompt = `You are an AI assistant for SmartLink, a link management platform. Using the context below, answer the user's question helpfully and concisely.
      
Context: ${bestMatch.text}

User Question: ${message}

Please provide a helpful response:`;
    } else {
      prompt = `You are an AI assistant for SmartLink, a powerful link management and analytics platform. 
      
The user asked: ${message}

Please provide a helpful, friendly response. If asked about link analytics, suggest they create more links to get better insights. If asked about features, mention link shortening, QR codes, custom domains, and advanced analytics.

Response:`;
    }

    const response = await chatModel.invoke([{ role: "user", content: prompt }]);
    res.json({ reply: response.content });
  } catch (error: any) {
    console.error("Chat error:", error);
    res.status(500).json({
      message: "Failed to process chat request",
      error: error.message
    });
  }
});

// Legacy route with explicit userId param
router.post("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    // Try to find user embeddings for context
    const userEmbeddings = await Embedding.find({ userId });

    let prompt = "";

    if (userEmbeddings.length > 0) {
      // If embeddings exist, use RAG approach
      const queryVec = await embeddings.embedQuery(message);

      let bestMatch = userEmbeddings[0];
      let bestScore = -Infinity;

      for (const doc of userEmbeddings) {
        const dot = doc.embedding.reduce((sum, v, i) => sum + v * queryVec[i], 0);
        if (dot > bestScore) {
          bestScore = dot;
          bestMatch = doc;
        }
      }

      prompt = `You are an AI assistant for SmartLink, a link management platform. Using the context below, answer the user's question helpfully and concisely.
      
Context: ${bestMatch.text}

User Question: ${message}

Please provide a helpful response:`;
    } else {
      // Fallback: general AI assistant without specific context
      prompt = `You are an AI assistant for SmartLink, a powerful link management and analytics platform. 
      
The user asked: ${message}

Please provide a helpful, friendly response. If asked about link analytics, suggest they create more links to get better insights. If asked about features, mention link shortening, QR codes, custom domains, and advanced analytics.

Response:`;
    }

    const response = await chatModel.invoke([{ role: "user", content: prompt }]);
    res.json({ reply: response.content });
  } catch (error: any) {
    console.error("Chat error:", error);
    res.status(500).json({
      message: "Failed to process chat request",
      error: error.message
    });
  }
});

export default router;