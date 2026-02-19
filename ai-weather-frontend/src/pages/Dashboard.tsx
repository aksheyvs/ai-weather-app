import { useState } from "react";
import api from "../api/axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WeatherData {
    location: {
        city: string;
    };
    temperature: number;
    humidity: number;
    rain: boolean;
    icon: string;
}

export default function Dashboard() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [insight, setInsight] = useState<string | null>(null);
    const [remaining, setRemaining] = useState<number | null>(null);
    const [loadingWeather, setLoadingWeather] = useState(false);
    const [loadingAI, setLoadingAI] = useState(false);

    async function fetchWeather() {
        if (!city.trim()) return;

        try {
            setLoadingWeather(true);
            setInsight(null);

            const res = await api.get(`/weather?city=${city}`);

            setWeather(res.data.weather);
            setRemaining(res.data.remaining);
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to fetch weather");
        } finally {
            setLoadingWeather(false);
        }
    }

    async function fetchAIInsight() {
        if (!city.trim()) return;

        try {
            setLoadingAI(true);

            const res = await api.get(`/ai/insights?city=${city}&category=general`);

            setInsight(res.data.insight);
            setRemaining(res.data.remaining);
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to fetch AI insight");
        } finally {
            setLoadingAI(false);
        }
    }

    return (
        <div className="space-y-6 max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>Search Weather</CardTitle>
                </CardHeader>

                <CardContent className="flex gap-2">
                    <Input placeholder="Enter city..." value={city} onChange={(e) => setCity(e.target.value)} />
                    <Button onClick={fetchWeather} disabled={loadingWeather}>
                        {loadingWeather ? "Loading..." : "Search"}
                    </Button>
                </CardContent>
            </Card>

            {weather && (
                <Card>
                    <CardHeader>
                        <CardTitle>Weather in {weather.location.city}</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-6">
                            <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weather icon" />

                            <div className="space-y-1">
                                <p className="text-lg font-semibold">{weather.temperature}°C</p>
                                <p>Humidity: {weather.humidity}%</p>
                                <p>Rain: {weather.rain ? "Yes 🌧️" : "No ☀️"}</p>
                            </div>
                        </div>

                        <Button variant="secondary" onClick={fetchAIInsight} disabled={loadingAI}>
                            {loadingAI ? "Generating..." : "Get AI Insight"}
                        </Button>
                    </CardContent>
                </Card>
            )}

            {insight && (
                <Card>
                    <CardHeader>
                        <CardTitle>AI Insight</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{insight}</p>
                    </CardContent>
                </Card>
            )}

            {remaining !== null && (
                <p className="text-sm text-muted-foreground">Remaining API calls today: {remaining}</p>
            )}
        </div>
    );
}
