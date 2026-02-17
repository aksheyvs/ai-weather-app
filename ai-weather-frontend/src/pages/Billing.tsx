import { useEffect, useState } from "react";
import api from "../api/axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Billing() {
    async function upgrade() {
        const res = await api.post("/billing/checkout", {
            planId: "PRO_PLAN_ID",
        });
        window.location.href = res.data.url;
    }

    return (
        <div>
            <h2>Billing</h2>
            <button onClick={upgrade}>Upgrade to Pro</button>
        </div>
    );
}
