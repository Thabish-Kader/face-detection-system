import { storage } from "@/middleware/mutlerMiddleware";
import { Router } from "express";
import mutler from "multer";
import fs from "fs";
const upload = mutler({ storage: storage });

const router = Router();

router.post("/test-multiupload", upload.array("files", 5), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const fileDataPromises = files.map(async (file) => {
      const fileBuffer = await fs.promises.readFile(file.path);
      const dataUrl = `data:${file.mimetype};base64,${fileBuffer.toString(
        "base64",
      )}`;
      return { filename: file.originalname, dataUrl };
    });

    const fileData = await Promise.all(fileDataPromises);

    res.json({ files: fileData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
