import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { createConditionAlert } from "../controller/alert.controller.js";

const router = Router();

router.post("/condition", authenticate, createConditionAlert);

export default router;