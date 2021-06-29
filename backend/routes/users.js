import express from "express";
import {
	forgotPassword,
	signin,
	signup,
	verify,
	resetPassword,
} from "../controllers/user.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// ANCHOR routes
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/verify", verify);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

// router.post("/profile/edit", auth, profile);

export default router;
