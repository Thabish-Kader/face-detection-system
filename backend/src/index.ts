import express from "express";
import mutler from "multer";
import { PORT } from "@/constants";
import { mutlerMiddleware, storage } from "@/middleware/mutlerMiddleware";
import loginController from "@/controllers/login";
import fs from "fs";
import router from "./route";
import cors from "cors";
const app = express();

app.use(cors());
app.use(mutlerMiddleware);
const upload = mutler({ storage: storage });

const readFileAsync = (filePath: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

app.post("/login", upload.single("file"), loginController);
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
