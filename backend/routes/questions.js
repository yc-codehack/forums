import express from "express";

// custom
import { getQuestions, createQuestion } from "../controllers/questions.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getQuestions);
router.post("/new", auth, createQuestion);

export default router;
