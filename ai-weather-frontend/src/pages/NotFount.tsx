import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFount() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Card className="max-w-md w-full text-center p-8 space-y-6">
                <CardContent className="space-y-4">
                    <h1 className="text-5xl font-bold">404</h1>

                    <p className="text-muted-foreground">Oops! The page you're looking for doesn't exist.</p>

                    <Link to="/">
                        <Button>Go Back Home</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
