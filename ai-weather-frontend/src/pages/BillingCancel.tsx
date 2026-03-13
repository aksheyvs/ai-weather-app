import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BillingCancel() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
            <Card className="max-w-md w-full bg-slate-900 border border-slate-800 text-center">
                <CardHeader>
                    <CardTitle className="text-red-400 text-2xl">❌ Payment Cancelled</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <p className="text-slate-300">Your payment was cancelled. No charges were made.</p>

                    <div className="flex gap-3 justify-center">
                        <Link to="/billing">
                            <Button variant="secondary">Back to Billing</Button>
                        </Link>

                        <Link to="/dashboard">
                            <Button className="bg-blue-600 hover:bg-blue-500">Go to Dashboard</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
