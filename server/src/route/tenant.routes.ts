import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { inviteUser } from "../controller/tenant.controller.js";

const router = Router();

router.post("/invite", authenticate, inviteUser);

export default router;