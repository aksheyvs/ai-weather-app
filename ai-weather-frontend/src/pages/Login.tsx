import { useState } from "react";
import api from "../api/axios";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const setToken = useAuthStore((s) => s.setToken);
    const navigate = useNavigate();

    async function handleLogin() {
        const res = await api.post("/auth/login", { email, password });
        setToken(res.data.token);
        navigate("/dashboard");
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

                    <Button onClick={handleLogin}>Login</Button>

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
