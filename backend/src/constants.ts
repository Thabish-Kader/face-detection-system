import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8080;
export const FAST_API_ENDPOINT = "http://fastapi_app:8000/process_images";
// process.env.FAST_API_ENDPOINT || "http://127.0.0.1:8000/process_images";
export const POSTGRES_HOST = process.env.POSTGRES_HOST || "localhost";
export const POSTGRES_PORT = process.env.POSTGRES_PORT || "5432";
export const POSTGRES_USER = process.env.POSTGRES_USER || "thabish";
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || "mypassword";
export const POSTGRES_DB = process.env.POSTGRES_DB || "fds";
