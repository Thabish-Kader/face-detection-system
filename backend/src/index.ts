import express from "express";
import { PORT } from "@/constants";
import { mutlerMiddleware } from "@/middleware/mutlerMiddleware";
import router from "./route";
import cors from "cors";
const app = express();

app.use(cors());
app.use(mutlerMiddleware);

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
