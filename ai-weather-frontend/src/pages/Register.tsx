import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleRegister() {
        try {
            setLoading(true);
            setError("");

            await api.post("/auth/register", { name, email, password });

            navigate("/login");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center  bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 px-6">
            <Card className="w-full max-w-md bg-slate-900/80 backdrop-blur border border-slate-800 shadow-2xl">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-bold text-white">Create your account</CardTitle>

                    <p className="text-sm text-slate-400">Start using AI powered weather insights</p>
                </CardHeader>

                <CardContent className="space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm p-3 rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label className="text-slate-300">Name</Label>

                        <Input
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

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
                        className="w-full bg-blue-600 hover:bg-blue-500 font-semibold"
                        onClick={handleRegister}
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </Button>

                    <p className="text-sm text-center text-slate-400">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500 hover:text-blue-400 hover:underline">
                            Login
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
