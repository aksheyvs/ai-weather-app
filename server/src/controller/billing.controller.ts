import type { Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware.js";
import { stripe } from "../config/stripe.js";
import { STRIPE_PRICE_MAP } from "../config/stripePrices.js";
import { prisma } from "../db/postgresClient.js"

export async function createCheckoutSession(req: AuthRequest, res: Response) {
    try {
        const tenantId = req.user?.tenantId;
        const { planId } = req.body;

        if (!tenantId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!planId) {
            return res.status(400).json({ message: "planId is required" })
        }

        const plan = await prisma.plan.findUnique({
            where: { id: planId },
        });

        if (!plan) {
            return res.status(404).json({ message: "Plan not fount" });
        }

        const stripePriceId = plan.name in STRIPE_PRICE_MAP ? STRIPE_PRICE_MAP[plan.name as keyof typeof STRIPE_PRICE_MAP] : null;

        if (!stripePriceId) {
            return res.status(400).json({
                message: "Free plan does not require payment",
            });
        }

        const frontendUrl = process.env.FRONTEND_URL

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: stripePriceId,
                    quantity: 1,
                },
            ],

            success_url: `${frontendUrl}/billing/success`,
            cancel_url: `${frontendUrl}/billing/cancel`,
            metadata: {
                tenantId,
                planId,
            },
            subscription_data: {
                metadata: {
                    tenantId,
                    planId,
                },
            },
        });

        return res.json({ url: session.url });
    } catch (err) {
        console.error("Checkout error:", err);
        res.status(500).json({ message: "Checkout failed" });
    }
}

export async function getBillingStatus(req: AuthRequest, res: Response) {
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
            return res.status(404).json({ message: "Billing not found" });
        }

        const proPlan = await prisma.plan.findFirst({
            where: { name: "Pro" },
        });

        return res.json({
            planName: billing.plan.name,
            apiLimit: billing.plan.apiLimit,
            planId: billing.planId,
            proPlanId: proPlan?.id || null,
        });

    } catch (err) {
        console.error("Billing status error:", err);
        res.status(500).json({ message: "Failed to load billing" });
    }
}