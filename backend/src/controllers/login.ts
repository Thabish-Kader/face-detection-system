import axios from "axios";
import { Request, Response } from "express";
import { FAST_API_ENDPOINT } from "@/constants";
import User from "@/models/user";

const loginContoller = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const fastApi = await axios.get(FAST_API_ENDPOINT);
    const { data } = fastApi;

    await User.create({
      uniqueFaceId: data,
    })
      .then((data) => res.json({ data: data }).status(200))
      .catch((err) => res.status(500).json({ error: err }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default loginContoller;
