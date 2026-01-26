import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { getAIInsight } from "../controller/ai.controller.js";

const router = Router();

router.get("/insights", authenticate, getAIInsight);

export default router;