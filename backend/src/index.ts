import express from "express";
import mutler from "multer";
import axios from "axios";
import fs from "fs";
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = mutler.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = mutler({ storage: storage });

app.post("/login", upload.single("file"), async (req, res) => {
  const { file } = req;
  const FLASK_ENDPOINT = "http://127.0.0.1:5000/face_recognition";

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
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
