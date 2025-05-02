import Redis from "ioredis"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

export const redis = new Redis(process.env.UPSTASH_URL);

