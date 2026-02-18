import express from "express"
import { stripe } from "../config/stripe.js"
import { prisma } from "../db/postgresClient.js"

const router = express.Router();

router.post("/webhook", express.raw({ type: "application/json" }),
    async (req, res) => {
        const signature = req.headers["stripe-signature"] as string;

        let event;

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET as string
            );
        } catch (err) {
            console.error("Stripe webhook verification failed");
            return res.status(400).send("Webhook error");
        }

        if (event.type === "checkout.session.completed") {
            const session = event.data.object as any;

            const tenantId = session.metadata?.tenantId;
            const planId = session.metadata?.planId;

            if (!tenantId || !planId) {
                return res.status(400).json({ message: "Missing metadata" });
            }

            await prisma.billing.update({
                where: { tenantId },
                data: {
                    planId,
                    status: "active",
                    stripeCustomerId: session.customer,
                    stripeSubscriptionId: session.subscription,
                    startDate: new Date(),
                    endDate: null,
                },
            });
        }

        if (event.type === "invoice.payment_failed") {
            const invoice = event.data.object as any;

            const subscriptionId = invoice.subscription;

            await prisma.billing.updateMany({
                where: { stripeSubscriptionId: subscriptionId },
                data: {
                    status: "past_due",
                },
            });
        }

        res.json({ received: true });
    });

export default router;