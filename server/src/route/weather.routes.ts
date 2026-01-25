import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { getWeather } from "../controller/weather.controller.js";

const router = Router();

router.get("/", authenticate, getWeather);

export default router;