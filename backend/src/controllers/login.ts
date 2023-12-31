import axios from "axios";
import { Request, Response } from "express";
import { FLASK_ENDPOINT } from "../constants";

const loginController = async (req: Request, res: Response) => {
  const { file } = req;

  if (!file) {
    res.status(400).json({ error: "No file found" });
    return;
  }
  try {
    const flaskResponse = await axios.post(FLASK_ENDPOINT, {
      data: file?.filename,
    });
    const unique_id = flaskResponse.data;
    res.status(200).json(unique_id);
  } catch (err) {
    res.status(400).json(err);
  }
};

export default loginController;
