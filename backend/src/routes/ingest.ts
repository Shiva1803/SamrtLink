import express from "express";
import { embeddings } from "../config/openai";
import { Embedding } from "../models/Embedding";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, text } = req.body;
  if (!text) return res.status(400).json({ message: "Missing text" });

  const vector = await embeddings.embedQuery(text);
  const doc = new Embedding({ userId, text, embedding: vector });
  await doc.save();

  res.json({ message: "Embedding stored successfully" });
});

export default router;