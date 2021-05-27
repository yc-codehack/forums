import express from "express";

// custom
import {
	getQuestions,
	createQuestion,
	searchQuestions,
} from "../controllers/questions.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/new", auth, createQuestion);
router.get("/list/:filter/:filterInfo/:sort/:sortInfo", getQuestions); // **TODO Refactor the method to take parameter from url
router.get("/search", searchQuestions);

export default router;
