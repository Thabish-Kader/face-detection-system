import { storage } from "@/middleware/mutlerMiddleware";
import { Router } from "express";
import mutler from "multer";
import loginController from "@/controllers/login";

const upload = mutler({ storage: storage });

const router = Router();

router.post("/login-with-faceId", upload.array("files", 5), loginController);

export default router;
