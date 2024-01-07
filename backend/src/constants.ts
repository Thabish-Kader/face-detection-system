import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8080;
export const FAST_API_ENDPOINT =
  process.env.FAST_API_ENDPOINT || "http://127.0.0.1:8000/process_images";
