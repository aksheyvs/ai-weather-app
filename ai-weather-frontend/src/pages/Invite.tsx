import { useState } from "react";
import api from "../api/axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Invite() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleInvite() {
        await api.post("/tenant/invite", { email, password });
        setEmail("");
        setPassword("");
        alert("User invited!");
    }

    return (
        <div className="space-y-4 w-100">
            <Input placeholder="User email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <Input
                type="password"
                placeholder="Temporary password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={handleInvite}>Invite user</Button>
        </div>
    );
}
