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

    if (isLoading) {
        return (
            <div className="max-w-3xl mx-auto">
                <p className="text-slate-400">Loading billing...</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Card className="bg-slate-900 border border-slate-800">
                <CardHeader>
                    <CardTitle className="text-white">Subscription</CardTitle>
                </CardHeader>

                <CardContent className="space-y-5 text-slate-300">
                    {billing && (
                        <>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Current Plan</span>
                                <span className="text-white font-semibold">{billing.planName}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Daily API Limit</span>
                                <span className="text-white font-semibold">{billing.apiLimit}</span>
                            </div>

                            {billing.planName === "Free" && (
                                <div className="pt-4 border-t border-slate-800">
                                    <p className="text-sm text-slate-400 mb-3">
                                        Upgrade to Pro for unlimited AI insights and higher API limits.
                                    </p>

                                    <Button
                                        className="bg-blue-600 hover:bg-blue-500"
                                        onClick={() => upgrade(billing.proPlanId)}
                                        disabled={isPending}
                                    >
                                        {isPending ? "Redirecting..." : "Upgrade to Pro"}
                                    </Button>
                                </div>
                            )}

                            {billing.planName !== "Free" && (
                                <p className="text-green-400 text-sm">You are currently on a Pro plan.</p>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
