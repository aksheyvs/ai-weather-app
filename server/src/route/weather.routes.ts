import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { getWeather } from "../controller/weather.controller.js";
import { requirePlanLimit } from "../middleware/requirePlanLimit.js";

const router = Router();

router.get("/", authenticate, requirePlanLimit, getWeather);

export default router;