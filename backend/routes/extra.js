import express from "express";
import { getCategory } from "../controllers/category.js";
import {
	getTopCategory,
	getTopUser,
	// userProfile,
} from "../controllers/dashboard.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/category", getCategory);
router.get("/topUser", getTopUser);
router.get("/topCategory", getTopCategory);
// router.get("/userProfile", auth, userProfile);

export default router;
