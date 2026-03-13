import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <div className="max-w-md mx-auto space-y-6">
            <Card className="bg-slate-900 border border-slate-800">
                <CardHeader>
                    <CardTitle className="text-white">Invite User</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-slate-300">User Email</Label>
                        <Input
                            placeholder="user@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-slate-300">Temporary Password</Label>
                        <Input
                            type="password"
                            placeholder="Temporary password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-500"
                        />
                    </div>

                    <Button
                        className="w-full bg-blue-600 hover:bg-blue-500"
                        onClick={handleInvite}
                        disabled={isPending}
                    >
                        {isPending ? "Inviting..." : "Send Invite"}
                    </Button>

                    {isSuccess && (
                        <div className="bg-green-500/10 border border-green-500 text-green-400 text-sm p-2 rounded">
                            User invited successfully
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm p-2 rounded">
                            {(error as any)?.response?.data?.message || "Failed to invite user"}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
