import express from "express";

import { getCategory } from "../controllers/category.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/category", getCategory);

export default router;
