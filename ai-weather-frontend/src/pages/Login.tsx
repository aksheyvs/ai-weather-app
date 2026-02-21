import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { mutate, isPending, error } = useMutation({
        mutationFn: async () => {
            const res = await api.post("/auth/login", {
                email,
                password,
            });
            return res.data;
        },
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);

            navigate("/dashboard");
        },
    });

    function handleLogin() {
        if (!email.trim() || !password.trim()) return;
        mutate();
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-100">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div>
                        <label>Email</label>
                        <Input placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <Label>Password</Label>
                        <Input type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <Button onClick={handleLogin} disabled={isPending}>
                        {isPending ? "Logging in..." : "Login"}
                    </Button>

                    {error && (
                        <p className="text-red-600 text-sm text-center">
                            {(error as any)?.response?.data?.message || "Login failed. Please try again."}
                        </p>
                    )}

                    <p className="text-sm text-center text-muted-foreground">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-primary hover:underline">
                            Register here
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
