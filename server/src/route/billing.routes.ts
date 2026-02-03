import { Router } from "express";
import { createCheckoutSession } from "../controller/billing.controller.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/checkout", authenticate, createCheckoutSession);

export default router;