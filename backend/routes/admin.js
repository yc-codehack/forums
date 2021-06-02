import express from "express";

import auth from "../middleware/auth.js";

import { createCategory } from "../controllers/category.js";

const router = express.Router();

router.post("/category/new", auth, createCategory);

export default router;
