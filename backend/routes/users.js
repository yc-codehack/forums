import express from "express";
import { signin, signup, verify } from "../controllers/user.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// ANCHOR routes
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/verify", verify);
// router.post("/profile/edit", auth, profile);

export default router;
