import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const FLASK_ENDPOINT = "http://127.0.0.1:5000/face_recognition";
