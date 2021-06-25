import express from "express";

// custom
import { createAnswer, updateAnswer } from "../controllers/answers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/new", createAnswer);
router.patch("/update", auth, updateAnswer);

export default router;
