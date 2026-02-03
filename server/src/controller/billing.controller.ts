import type { Request, Response } from "express";
import { stripe } from "../config/stripe.js";
import { STRIPE_PRICE_MAP } from "../config/stripePrices.js";
import { prisma } from "../db/postgresClient.js"

export async function createCheckoutSession(req: Request, res: Response) {
    try {
        const { tenantId, planId } = req.body;

        if (!tenantId || planId) {
            return res.status(400).json({
                message: "tenantId and planId are required",
            });
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

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: stripePriceId,
                    quantity: 1,
                },
            ],
            success_url: "http://localhost:3000/billing/success",
            cancel_url: "http://localhost:3000/billing/cancel",
            metadata: {
                tenantId,
                planId,
            },
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error("Checkout error:", err);
        res.status(500).json({ message: "Checkout failed" });
    }
}