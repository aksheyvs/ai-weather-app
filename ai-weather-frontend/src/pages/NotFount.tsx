import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFount() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
            <Card className="max-w-md w-full bg-slate-900 border border-slate-800 text-center">
                <CardContent className="p-8 space-y-6">
                    <h1 className="text-6xl font-bold text-white">404</h1>

                    <p className="text-slate-400">Oops! The page you're looking for doesn't exist.</p>

                    <div className="flex justify-center gap-3">
                        <Link to="/">
                            <Button variant="secondary">Home</Button>
                        </Link>

                        <Link to="/dashboard">
                            <Button className="bg-blue-600 hover:bg-blue-500">Dashboard</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
