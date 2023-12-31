import express from "express";
import mutler from "multer";
import { PORT } from "@/constants";
import { mutlerMiddleware, storage } from "@/middleware/mutlerMiddleware";
import loginController from "@/controllers/login";

const app = express();

app.use(mutlerMiddleware);
const upload = mutler({ storage: storage });

app.post("/login", upload.single("file"), loginController);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
