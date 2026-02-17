import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { createCheckoutSession, getBillingStatus } from "../controller/billing.controller.js";

const router = Router();

router.get("/status", authenticate, getBillingStatus);

router.post("/checkout", authenticate, createCheckoutSession);

export default router;