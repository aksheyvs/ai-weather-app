import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./authMiddleware.js";
import { prisma } from "../db/postgresClient.js";

export async function requirePlanLimit(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const tenantId = req.user?.tenantId;

        if (!tenantId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const billing = await prisma.billing.findUnique({
            where: { tenantId },
            include: { plan: true },
        });

        if (!billing) {
            return res.status(403).json({
                message: "Billing not configured"
            });
        }

        if (billing.status !== "active") {
            return res.status(403).json({
                message:
                    billing.status === "past_due"
                        ? "Payment failed. Please update tour payment method."
                        : "Subscription inactive",
            });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const usage = await prisma.usage.upsert({
            where: {
                tenantId_date: {
                    tenantId,
                    date: today,
                },
            },
            update: {
                count: {
                    increment: 1,
                },
            },
            create: {
                tenantId,
                date: today,
                count: 1,
            },
        });

        if (usage.count > billing.plan.apiLimit) {
            return res.status(429).json({
                message: "Daily API limit reached"
            });
        }

        next();
    } catch (err) {
        next(err);
    }
}