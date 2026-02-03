import type { Response, NextFunction } from "express"
import type { AuthRequest } from "./authMiddleware.js"
import { prisma } from "../db/postgresClient.js"

export async function planLimit(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const tenantId = req.user?.tenantId;

        if (!tenantId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const billing = await prisma.billing.findUnique({
            where: { tenantId },
            include: { plan: true },
        });

        if (!billing || billing.status !== "active") {
            return res.status(403).json({
                message: "no active subscription",
            });
        }

        if (billing.plan.apiLimit <= 0) {
            return res.status(429).json({
                message: "API limit reached for your plan",
            });
        }

        next();
    } catch (err) {
        next(err);
    }
}