import OpenAI from "openai";
import { pipeline } from "@xenova/transformers";

// Free local embeddings using HuggingFace Transformers
let embedder: any = null;

async function getEmbedder() {
  if (!embedder) {
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  return embedder;
}

export const embeddings = {
  async embedQuery(text: string): Promise<number[]> {
    const extractor = await getEmbedder();
    const output = await extractor(text, { pooling: 'mean', normalize: true });
    return Array.from(output.data);
  },

  async embedDocuments(texts: string[]): Promise<number[][]> {
    const results = [];
    for (const text of texts) {
      results.push(await this.embedQuery(text));
    }
    return results;
  }
};

// Lazy initialization of OpenAI client
let openaiClient: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPEN_AI_KEY || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPEN_AI_KEY or OPENAI_API_KEY environment variable is not set. Please check your .env file.');
    }
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
}

// Chat model wrapper compatible with previous usage
export const chatModel = {
  async invoke(messages: { role: 'system' | 'user' | 'assistant'; content: string }[]): Promise<{ content: string }> {
    const client = getOpenAI();
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

    const resp = await client.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
    });

    const content = resp.choices?.[0]?.message?.content ?? '';
    return { content };
  }
};
