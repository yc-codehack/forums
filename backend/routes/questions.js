import express from "express";

// custom
import { getQuestions, createQuestion } from "../controllers/questions.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/list/:filter/:filterInfo/:sort/:sortInfo", getQuestions); // **TODO Refactor the method to take parameter from url
router.post("/new", auth, createQuestion);

export default router;
