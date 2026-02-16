import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-100">
                <CardHeader>
                    <CardTitle>Create Account</CardTitle>
                </CardHeader>

                <CardContent>
                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Password</Label>
                        <Input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button className="w-full" onClick={handleRegister} disabled={loading}>
                        {loading ? "Creating..." : "Register"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
