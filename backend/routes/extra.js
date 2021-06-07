import express from "express";

import { getCategory } from "../controllers/category.js";
import { getTopCategory, getTopUser } from "../controllers/dashboard.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/category", getCategory);
router.get("/topUser", getTopUser);
router.get("/topCategory", getTopCategory);

export default router;
