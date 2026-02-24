import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { getAlerts, createConditionAlert } from "../controller/alert.controller.js";

const router = Router();

router.get("/", authenticate, getAlerts);

router.post("/condition", authenticate, createConditionAlert);

export default router;