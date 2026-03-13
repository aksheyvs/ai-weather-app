import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWeather, getAIInsight } from "@/api/weather";
import type { AIInsightCategory } from "@/api/weather";
import ReactMarkdown from "react-markdown";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
    const queryClient = useQueryClient();

    const [city, setCity] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [category, setCategory] = useState<AIInsightCategory>("general");

    const {
        data: weatherData,
        isLoading: loadingWeather,
        error: weatherError,
    } = useQuery({
        queryKey: ["weather", searchCity],
        queryFn: () => getWeather(searchCity),
        enabled: !!searchCity,
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
    });

    const {
        mutate: fetchAI,
        data: aiDate,
        isPending: loadingAI,
    } = useMutation({
        mutationFn: () => getAIInsight(searchCity, category),
    });

    function handleSearch() {
        if (!city.trim()) return;

        const normalizedCity = city.trim().toLowerCase();
        setSearchCity(normalizedCity);

        queryClient.setQueryData(["lastCity"], normalizedCity);
    }

    function handleAI() {
        if (!searchCity) return;
        fetchAI();
    }

    useEffect(() => {
        const lastCity = queryClient.getQueryData<string>(["lastCity"]);

        if (lastCity) {
            setSearchCity(lastCity);
            setCity(lastCity);
        }
    }, []);

    const remaining = aiDate?.remaining ?? weatherData?.remaining ?? null;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <Card className="bg-slate-900 border border-slate-800">
                <CardHeader>
                    <CardTitle className="text-white">Search Weather</CardTitle>
                </CardHeader>

                <CardContent className="flex gap-3">
                    <Input
                        placeholder="Enter city..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-500"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch();
                        }}
                    />

                    <Button onClick={handleSearch} disabled={loadingWeather}>
                        {loadingWeather ? "Loading..." : "Search"}
                    </Button>
                </CardContent>
            </Card>

            {weatherError && <p className="text-red-500">Failed to fetch weather</p>}

            {weatherData?.weather && (
                <Card className="bg-slate-900 border border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white">Weather in {weatherData.weather.location.city}</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-6">
                            <img
                                src={`https://openweathermap.org/img/wn/${weatherData.weather.icon}@2x.png`}
                                alt="weather icon"
                            />

                            <div className="space-y-1 text-slate-300">
                                <p className="text-2xl font-bold text-white">{weatherData.weather.temperature}°C</p>

                                <p>Humidity: {weatherData.weather.humidity}%</p>
                                <p>Rain: {weatherData.weather.rain ? "Yes 🌧️" : "No ☀️"}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-slate-400">AI Insight Category</label>

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value as AIInsightCategory)}
                                className="w-full bg-slate-950 border border-slate-700 text-white rounded-md p-2"
                            >
                                <option value="general">General</option>
                                <option value="farming">Farming</option>
                                <option value="outdoor">Outdoor</option>
                            </select>
                        </div>

                        <Button variant="secondary" onClick={handleAI} disabled={loadingAI}>
                            {loadingAI ? "Generating..." : "Get AI Insight"}
                        </Button>
                    </CardContent>
                </Card>
            )}

            {aiDate?.insight && (
                <Card className="bg-slate-900 border border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white">AI Insight ({category})</CardTitle>
                    </CardHeader>

                    <CardContent className="prose prose-invert max-w-none text-slate-200 leading-relaxed">
                        <ReactMarkdown>{aiDate.insight}</ReactMarkdown>
                    </CardContent>
                </Card>
            )}

            {remaining !== null && <p className="text-sm text-slate-400">Remaining API calls today: {remaining}</p>}
        </div>
    );
}
