import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY not defined");
}

export const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY as string,

    {
        apiVersion: "2026-01-28.clover",
    }
)