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
        <div className="min-h-screen flex items-center justify-center  bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 px-6">
            <Card className="w-full max-w-md bg-slate-900/80 backdrop-blur border border-slate-800 shadow-2xl">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>

                    <p className="text-sm text-slate-400">Login to access your weather dashboard</p>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label className="text-slate-300">Email</Label>

                        <Input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-slate-300">Password</Label>

                        <Input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <Button
                        onClick={handleLogin}
                        disabled={isPending}
                        className="w-full bg-blue-600 hover:bg-blue-500 font-semibold"
                    >
                        {isPending ? "Logging in..." : "Login"}
                    </Button>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm p-3 rounded-md text-center">
                            {(error as any)?.response?.data?.message || "Login failed. Please try again."}
                        </div>
                    )}

                    <p className="text-sm text-center text-slate-400">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-500 hover:text-blue-400 hover:underline">
                            Register here
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
