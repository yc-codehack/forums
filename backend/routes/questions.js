import express from "express";

// custom
import {
	getQuestions,
	createQuestion,
	searchQuestions,
	updateQuestion,
	searchBar,
	getThread,
	deleteThread,
} from "../controllers/questions.js";
import { like, dislike } from "../controllers/utils/likeDislike.js";
import auth from "../middleware/auth.js";
import paginatedResults from "../middleware/pagination.js";

const router = express.Router();

router.post("/new", createQuestion);
router.post("/update", auth, updateQuestion);

router.get("/thread", getThread);
router.post("/thread/delete", auth, deleteThread);

router.get("/list", paginatedResults, getQuestions); // **TODO Refactor the method to take parameter from url

router.get("/search", searchQuestions);
router.get("/search/autocomplete", searchBar);

router.patch("/like", auth, like);
router.patch("/dislike", auth, dislike);

export default router;
