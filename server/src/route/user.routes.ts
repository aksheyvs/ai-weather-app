import { Router } from "express"
import { authenticate } from "../middleware/authMiddleware.js"
import { savePushToken } from "../controller/user.controller.js"

const router = Router();

router.post("/push-token", authenticate, savePushToken);

export default router;