import Redis from "ioredis"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

// Resolve project root .env file path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// Load environment variables from project root .env file
dotenv.config({ path: path.resolve(__dirname, "../../.env") })

export const redis = new Redis(process.env.UPSTASH_URL);

