import express from "express";
import { PORT } from "@/constants";
import { mutlerMiddleware } from "@/middleware/mutlerMiddleware";
import router from "./route";
import cors from "cors";
import { dbConnection } from "./config/db";
const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(mutlerMiddleware);

app.use("/api/v1", router);

app.listen(PORT, () => {
  dbConnection();
  console.log(`Listening on port ${PORT}`);
});
