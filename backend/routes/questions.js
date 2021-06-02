import express from "express";

// custom
import {
	getQuestions,
	createQuestion,
	searchQuestions,
} from "../controllers/questions.js";
import { like, dislike } from "../controllers/utils/likeDislike.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/new", auth, createQuestion);
router.get("/list", getQuestions); // **TODO Refactor the method to take parameter from url
router.get("/search", searchQuestions);

router.post("/like", auth, like);
router.post("/dislike", auth, dislike);

export default router;
