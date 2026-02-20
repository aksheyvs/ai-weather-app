import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/rbacMiddleware.js";
import { inviteUser } from "../controller/tenant.controller.js";

const router = Router();

router.post("/invite", authenticate, authorize("admin"), inviteUser);

export default router;