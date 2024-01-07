import axios from "axios";
import { Request, Response } from "express";
import { FAST_API_ENDPOINT, PORT } from "@/constants";
import fs from "fs";

const loginContoller = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const fastApi = await axios.get(FAST_API_ENDPOINT);
    const { data } = fastApi;

    //  cleanup to delete files
    await Promise.all(
      files.map(async (file) => {
        await fs.promises.unlink(file.path);
      }),
    );

    res.json({ data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default loginContoller;
