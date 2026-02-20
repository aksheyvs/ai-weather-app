import express from "express"
import { stripe } from "../config/stripe.js"
import { prisma } from "../db/postgresClient.js"
import { STRIPE_PRICE_MAP } from "../config/stripePrices.js";

const router = express.Router();

router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
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
            console.error("Stripe webhook verification failed", err);
            return res.status(400).send("Webhook error");
        }

        console.log(JSON.stringify(event, null, 2))

        switch (event.type) {
            case "checkout.session.completed": {
                try {
                    const session = event.data.object as any;

                    const tenantId = session.metadata?.tenantId;
                    const planId = session.metadata?.planId;

                    if (!tenantId || !planId) {
                        console.error("Missing metadata in checkout session");
                        break;
                    }

                    await prisma.billing.upsert({
                        where: { tenantId },
                        update: {
                            planId,
                            status: "active",
                            stripeCustomerId: session.customer,
                            stripeSubscriptionId: session.subscription,
                            startDate: new Date(),
                            endDate: null,
                        },
                        create: {
                            tenantId,
                            planId,
                            status: "active",
                            stripeCustomerId: session.customer,
                            stripeSubscriptionId: session.subscription,
                            startDate: new Date(),
                        },
                    });

                    console.log("Subscription activated for tenant:", tenantId);
                } catch (err) {
                    console.error("Error handling checkout.session.completed:", err)
                }
                break;
            }

            case "invoice.payment_failed": {
                try {
                    const invoice = event.data.object as any;
                    const subscriptionId = invoice.subscription;

                    await prisma.billing.updateMany({
                        where: { stripeSubscriptionId: subscriptionId },
                        data: { status: "past_due" },
                    });
                    console.log("Payment failed for subscription:", subscriptionId);
                } catch (err) {
                    console.error("Error handling invoice.payment_failed:", err);
                }
                break;
            }

            case "customer.subscription.deleted": {
                try {
                    const subscription = event.data.object as any;

                    const billing = await prisma.billing.findFirst({
                        where: { stripeSubscriptionId: subscription.id },
                    });

                    if (!billing) break;

                    const freePlan = await prisma.plan.findFirst({
                        where: { name: "Free" },
                    });

                    if (!freePlan) break;

                    await prisma.billing.update({
                        where: { tenantId: billing.tenantId },
                        data: {
                            planId: freePlan.id,
                            status: "active",
                            stripeSubscriptionId: null,
                            stripeCustomerId: null,
                            endDate: new Date(),
                        },
                    });

                    console.log("Downgraded to Free:", billing.tenantId);
                } catch (err) {
                    console.error("Error handling customer.subscription.deleted:", err);
                }
                break;
            }

            case "customer.subscription.updated": {
                try {
                    const subscription = event.data.object as any;

                    const priceId = subscription.items.data[0].price.id;

                    const planName =
                        Object.keys(STRIPE_PRICE_MAP).find(
                            (key) =>
                                STRIPE_PRICE_MAP[key as keyof typeof STRIPE_PRICE_MAP] === priceId
                        ) || "Free";

                    const plan = await prisma.plan.findFirst({
                        where: { name: planName },
                    });

                    if (!plan) break;

                    await prisma.billing.updateMany({
                        where: { stripeSubscriptionId: subscription.id },
                        data: {
                            planId: plan.id,
                            status: subscription.status === "active" ? "active" : "inactive",
                        },
                    });

                    console.log("Subscription updated:", subscription.id);
                } catch (err) {
                    console.error("Error handling customer.subscription.updated:", err);
                }
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }


        res.json({ received: true });
    });

export default router;