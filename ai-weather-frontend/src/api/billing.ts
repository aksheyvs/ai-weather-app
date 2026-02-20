import api from "./axios";

export async function getBillingStatus() {
    const res = await api.get("/billing/status");
    return res.data;
}

export async function createCheckout(planId: string) {
    const res = await api.post("/billing/checkout", { planId });
    return res.data;
}