import { useQuery, useMutation } from "@tanstack/react-query";
import { getBillingStatus, createCheckout } from "@/api/billing";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Billing() {
    const { data: billing, isLoading } = useQuery({
        queryKey: ["billing"],
        queryFn: getBillingStatus,
    });

    const { mutate: upgrade, isPending } = useMutation({
        mutationFn: createCheckout,
        onSuccess: (data) => {
            window.location.href = data.url;
        },
    });

    if (isLoading) return <p>Loading billing...</p>;

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

                        {billing.planName === "Free" && (
                            <Button onClick={() => upgrade(billing.proPlanId)} disabled={isPending}>
                                {isPending ? "Redirecting..." : "Upgrade to Pro"}
                            </Button>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
}
