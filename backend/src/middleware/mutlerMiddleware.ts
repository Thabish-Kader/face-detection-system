import express from "express";
import mutler from "multer";
import path from "path";

const mutlerMiddleware = express.Router();

mutlerMiddleware.use(express.json());
mutlerMiddleware.use(express.urlencoded({ extended: true }));

const storage = mutler.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// const storage = mutler.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

export { mutlerMiddleware, storage };
