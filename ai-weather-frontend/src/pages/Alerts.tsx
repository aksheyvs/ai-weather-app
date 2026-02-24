import { useState } from "react";
import api from "../api/axios";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Alert {
    _id: string;
    city: string;
    conditionType: string;
    operator: string;
    value: number;
    triggered: boolean;
    createdAt: string;
}

export default function Alerts() {
    const queryClient = useQueryClient();

    const [city, setCity] = useState("");
    const [conditionType, setConditionType] = useState("temperature");
    const [operator, setOperator] = useState(">");
    const [value, setValue] = useState<number>(0);

    const {
        data: alerts,
        isLoading,
        isError,
    } = useQuery<Alert[]>({
        queryKey: ["alerts"],
        queryFn: async () => {
            const res = await api.get("alerts");
            return res.data;
        },
    });

    const createMutation = useMutation({
        mutationFn: async () => {
            await api.post("/alerts/condition", {
                city,
                conditionType,
                operator,
                value,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["alerts"] });
        },
    });

    function handleCreate() {
        if (!city) {
            alert("City is required");
            return;
        }

        createMutation.mutate();
    }

    return (
        <div className="space-y-6 max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>Create Condition Alert</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>City</Label>
                        <Input placeholder="Enter city..." value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <Label>Condition Type</Label>
                        <select
                            className="w-full border rounded-md p-2"
                            value={conditionType}
                            onChange={(e) => setConditionType(e.target.value)}
                        >
                            <option value="temperature">Temperature</option>
                            <option value="humidity">Humidity</option>
                            <option value="rain">Rain</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label>Operator</Label>
                        <select
                            className="w-full border rounded-md p-2"
                            value={operator}
                            onChange={(e) => setOperator(e.target.value)}
                        >
                            <option value=">">Greater than</option>
                            <option value="<">Less than</option>
                            <option value=">=">Greater or equal</option>
                            <option value="<=">Less or equal</option>
                            <option value="==">Equal</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label>Value</Label>
                        <Input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} />
                    </div>

                    <Button onClick={handleCreate} disabled={createMutation.isPending}>
                        {createMutation.isPending ? "Creating..." : "Create Alert"}
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Your Alerts</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {isLoading && <p className="text-sm text-gray-500">Loading alerts...</p>}

                    {isError && <p className="text-sm text-red-500">Failed to load alerts.</p>}

                    {alerts && alerts.length === 0 && <p className="text-sm text-gray-500">No alerts created yet</p>}

                    {alerts?.map((alert) => (
                        <div key={alert._id} className="border rounded-md p-3">
                            <p className="font-medium">{alert.city}</p>

                            <p className="text-sm text-gray-600">
                                {alert.conditionType} {alert.operator} {alert.value}
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                                Status: {alert.triggered ? "Triggered ✅" : "Waiting ⏳"}
                            </p>

                            <p className="text-xs text-gray-400">
                                Created: {new Date(alert.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
