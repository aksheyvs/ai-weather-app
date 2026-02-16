import { useState } from "react";
import api from "../api/axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState<any>(null);

    async function fetchWeather() {
        if (!city) return;

        const res = await api.get(`/weather?city=${city}`);
        setWeather(res.data);
    }

    return (
        <div className="p-10 space-y-6">
            <div className="flex gap-2">
                <Input placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />

                <Button onClick={fetchWeather}>Search</Button>
            </div>

            {weather && (
                <Card className="w-100">
                    <CardHeader>
                        <CardTitle>{weather.location.city}</CardTitle>
                    </CardHeader>

                    <CardContent className="text-center space-y-3">
                        {weather.icon && (
                            <img
                                className="mx-auto"
                                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                                alt="weather"
                            />
                        )}

                        <p className="text-3xl font-bold">Temperature: {weather.temperature}°C</p>
                        <p>Humidity: {weather.humidity}%</p>
                        <p>Condition: {weather.condition}</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
