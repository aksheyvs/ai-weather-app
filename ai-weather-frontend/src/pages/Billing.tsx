import { useEffect, useState } from "react";
import api from "../api/axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Billing() {
    const [billing, setBilling] = useState<any>(null);

    useEffect(() => {
        async function loadBilling() {
            const res = await api.get("/billing/status");
            setBilling(res.data);
        }
        loadBilling();
    }, []);

    async function upgrade() {
        const res = await api.post("/billing/checkout", {
            planId: billing?.proPlanId,
        });

        window.location.href = res.data.url;
    }

    return (
        <Card className="w-100">
            <CardHeader>
                <CardTitle>Subscription</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
                {billing && (
                    <>
                        <p>Current Plan: {billing.planName}</p>
                        <p>API Limit: {billing.apiLimit}</p>

                        {billing.planName === "Free" && <Button onClick={upgrade}>Upgrade to Pro</Button>}
                    </>
                )}
            </CardContent>
        </Card>
    );
}
