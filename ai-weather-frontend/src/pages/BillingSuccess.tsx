import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BillingSuccess() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
            <Card className="max-w-md w-full bg-slate-900 border border-slate-800 text-center">
                <CardHeader>
                    <CardTitle className="text-green-400 text-2xl">🎉 Payment Successful!</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <p className="text-slate-300">Your subscription has been successfully upgraded to the Pro plan.</p>

                    <Link to="/dashboard">
                        <Button className="w-full bg-blue-600 hover:bg-blue-500">Go to Dashboard</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
