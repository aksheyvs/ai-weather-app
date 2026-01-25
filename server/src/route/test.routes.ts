import type {Response } from "express";
import {Router} from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/rbacMiddleware.js";

const router = Router();

router.get("/me", authenticate, (req: AuthRequest, res: Response) => {
    res.json({message: "You are logged in", user: req.user});
});

router.get("/user", authenticate, authorize("user", "admin"), (req: AuthRequest, res: Response) => {
    res.json({message: "User-only content"});
});

router.get("/admin", authenticate, authorize("admin"), (req: AuthRequest, res: Response) => {
    res.json({message: "Admin-only content"});
});

export default router;