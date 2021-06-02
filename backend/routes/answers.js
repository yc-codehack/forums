import express from "express";

// custom
import { createAnswer } from "../controllers/answers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/new", auth, createAnswer);

export default router;
