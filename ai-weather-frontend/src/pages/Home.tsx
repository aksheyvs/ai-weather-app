import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
    const token = localStorage.getItem("token");

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Card className="max-w-xl w-full text-center p-8 space-y-6">
                <CardContent className="space-y-4">
                    <h1 className="text-3xl font-bold">AI Weather SaaS Platform</h1>

                    <p className="text-muted-foreground">
                        Get real-time weather updates, AI-powered insights, and subscription-based API access.
                    </p>

                    <div className="flex justify-center gap-4 pt-4">
                        {!token ? (
                            <>
                                <Link to="/login">
                                    <Button>Login</Button>
                                </Link>

                                <Link to="/register">
                                    <Button variant="secondary">Register</Button>
                                </Link>
                            </>
                        ) : (
                            <Link to="/dashboard">
                                <Button>Go to Dashboard</Button>
                            </Link>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
