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
    checkIntervalHours: number;
    active: boolean;
}

export default function Alerts() {
    const queryClient = useQueryClient();

    const [city, setCity] = useState("");
    const [conditionType, setConditionType] = useState("temperature");
    const [operator, setOperator] = useState(">");
    const [value, setValue] = useState<number | "">("");
    const [interval, setInterval] = useState<number | "">("");
    const [editingId, setEditingId] = useState<string | null>(null);

    const {
        data: alerts,
        isLoading,
        isError,
    } = useQuery<Alert[]>({
        queryKey: ["alerts"],
        queryFn: async () => {
            const res = await api.get("/alerts");
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
                checkIntervalHours: interval,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["alerts"] });
            resetForm();
        },
    });

    const updateMutation = useMutation({
        mutationFn: async () => {
            await api.patch(`/alerts/${editingId}`, {
                city,
                conditionType,
                operator,
                value,
                checkIntervalHours: interval,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["alerts"] });
            resetForm();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/alerts/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["alerts"] });
        },
    });

    function resetForm() {
        (setCity(""),
            setConditionType("temperature"),
            setOperator(">"),
            setValue(""),
            setInterval(""),
            setEditingId(null));
    }

    function handleSubmit() {
        if (!city || value === "") {
            alert("City and value required");
            return;
        }

        if (editingId) {
            updateMutation.mutate();
        } else {
            createMutation.mutate();
        }
    }

    function startEdit(alert: Alert) {
        setEditingId(alert._id);
        setCity(alert.city);
        setConditionType(alert.conditionType);
        setOperator(alert.operator);
        setValue(alert.value);
        setInterval(alert.checkIntervalHours);
    }

    return (
        <div className="space-y-6 max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>{editingId ? "Edit Alert" : "Create Condition Alert"}</CardTitle>
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
                        <Input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value === "" ? "" : Number(e.target.value))}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Check Every (Hours)</Label>
                        <Input
                            type="number"
                            value={interval}
                            onChange={(e) => setInterval(e.target.value === "" ? "" : Number(e.target.value))}
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button onClick={handleSubmit}>{editingId ? "Update Alert" : "Create Alert"}</Button>

                        {editingId && (
                            <Button variant="secondary" onClick={resetForm}>
                                Cancel
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Your Alerts</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {isLoading && <p className="text-sm text-gray-500">Loading alerts...</p>}

                    {isError && <p className="text-sm text-red-500">Failed to load alerts.</p>}

                    {alerts?.length === 0 && <p className="text-sm text-gray-500">No alerts created yet</p>}

                    {alerts?.map((alert) => (
                        <div key={alert._id} className="border rounded-md p-3 flex justify-between items-center">
                            <div>
                                <p className="font-medium">{alert.city}</p>

                                <p className="text-sm text-gray-600">
                                    {alert.conditionType} {alert.operator} {alert.value}
                                </p>

                                <p className="text-xs text-gray-500 mt-1">Every: {alert.checkIntervalHours} hours</p>

                                <p className="text-xs mt-1">Status: {alert.active ? "Active ⏳" : "Triggered ✅"}</p>
                            </div>

                            <div className="flex gap-2">
                                <Button size="sm" variant="secondary" onClick={() => startEdit(alert)}>
                                    Edit
                                </Button>

                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => deleteMutation.mutate(alert._id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
