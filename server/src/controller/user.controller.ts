import type { Response, NextFunction } from "express"
import type { AuthRequest } from "../middleware/authMiddleware.js"
import { prisma } from "../db/postgresClient.js"

export async function savePushToken(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.userId;
        const { token } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!token) {
            return res.status(400).json({ message: "Push token required" });
        }

        await prisma.user.update({
            where: { id: userId },
            data: {
                pushToken: token,
            },
        });

        res.status(200).json({
            message: "Push token saved",
        });

    } catch (err) {
        next(err)
    }
}