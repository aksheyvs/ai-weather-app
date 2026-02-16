import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { getAIInsight } from "../controller/ai.controller.js";
import { requirePlanLimit } from "../middleware/requirePlanLimit.js";

const router = Router();

router.get("/insights", authenticate, requirePlanLimit, getAIInsight);

export default router;