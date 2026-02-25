import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { getAlerts, createConditionAlert, deleteAlert, updateAlert } from "../controller/alert.controller.js";

const router = Router();

router.get("/", authenticate, getAlerts);

router.post("/condition", authenticate, createConditionAlert);

router.delete("/:id", authenticate, deleteAlert);

router.patch("/:id", authenticate, updateAlert);

export default router;