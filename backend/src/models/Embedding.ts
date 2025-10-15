import mongoose from "mongoose";

const embeddingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  embedding: [Number],
}, { timestamps: true });

export const Embedding = mongoose.model("Embedding", embeddingSchema);