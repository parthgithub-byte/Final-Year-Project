import { z } from "zod";

const Env = z.object({
  PORT: z.coerce.number().default(4000),
  MONGO_URI: z.string().default("mongodb://localhost:27017/fraud_rag"),
  CHROMA_URL: z.string().default("http://localhost:8000"),
  OPENROUTER_API_KEY: z.string().default(""),
  OPENROUTER_BASE_URL: z.string().default("https://openrouter.ai/api/v1"),
  LLM_MODEL: z.string().default("openai/gpt-4o-mini"),
  USE_FAKE_LLM: z.enum(["true", "false"]).default("false").transform((v) => v === "true"),
  EMBEDDING_MODEL: z.string().default("Xenova/all-MiniLM-L6-v2"),
  AGENT_MAX_STEPS: z.coerce.number().int().positive().default(6),
  RISK_THRESHOLD: z.coerce.number().min(0).max(1).default(0.7),
});

export const config = Env.parse(process.env);
