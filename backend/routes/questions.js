import express from "express";

// custom
import {
	getQuestions,
	createQuestion,
	searchQuestions,
	updateQuestion,
} from "../controllers/questions.js";
import { like, dislike } from "../controllers/utils/likeDislike.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/new", auth, createQuestion);
router.patch("/update/:id", auth, updateQuestion);

router.get("/list", getQuestions); // **TODO Refactor the method to take parameter from url
router.get("/search", searchQuestions);

router.patch("/like", auth, like);
router.patch("/dislike", auth, dislike);

export default router;
