import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Invite() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { mutate, isPending, isSuccess, error } = useMutation({
        mutationFn: async () => {
            const res = await api.post("/invite", {
                email,
                password,
            });
            return res.data;
        },
        onSuccess: () => {
            setEmail("");
            setPassword("");
        },
    });

    function handleInvite() {
        if (!email.trim() || !password.trim()) return;
        mutate();
    }

    return (
        <div className="max-w-md space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Invite User</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <Input placeholder="User email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <Input
                        type="password"
                        placeholder="Temporary password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button className="w-full" onClick={handleInvite}>
                        {isPending ? "Inviting..." : "Sent Invite"}
                    </Button>

                    {isSuccess && <p className="text-green-600 text-sm">User invited successfully</p>}

                    {error && (
                        <p className="text-red-600 text-sm">
                            {(error as any)?.response?.data?.message || "Failed to invite user"}
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
