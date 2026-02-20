import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getWeather, getAIInsight } from "@/api/weather";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
    const [city, setCity] = useState("");
    const [searchCity, setSearchCity] = useState("");

    const {
        data: weatherData,
        isLoading: loadingWeather,
        error: weatherError,
    } = useQuery({
        queryKey: ["weather", searchCity],
        queryFn: () => getWeather(searchCity),
        enabled: !!searchCity,
    });

    const {
        mutate: fetchAI,
        data: aiDate,
        isPending: loadingAI,
    } = useMutation({
        mutationFn: () => getAIInsight(searchCity),
    });

    function handleSearch() {
        if (!city.trim()) return;
        setSearchCity(city);
    }

    return (
        <div className="space-y-6 max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>Search Weather</CardTitle>
                </CardHeader>

                <CardContent className="flex gap-2">
                    <Input placeholder="Enter city..." value={city} onChange={(e) => setCity(e.target.value)} />
                    <Button onClick={handleSearch} disabled={loadingWeather}>
                        {loadingWeather ? "Loading..." : "Search"}
                    </Button>
                </CardContent>
            </Card>

            {weatherError && <p className="text-red-500">Failed to fetch weather</p>}

            {weatherData?.weather && (
                <Card>
                    <CardHeader>
                        <CardTitle>Weather in {weatherData.weather.location.city}</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-6">
                            <img
                                src={`https://openweathermap.org/img/wn/${weatherData.weather.icon}@2x.png`}
                                alt="weather icon"
                            />

                            <div className="space-y-1">
                                <p className="text-lg font-semibold">{weatherData.weather.temperature}°C</p>
                                <p>Humidity: {weatherData.weather.humidity}%</p>
                                <p>Rain: {weatherData.weather.rain ? "Yes 🌧️" : "No ☀️"}</p>
                            </div>
                        </div>

                        <Button variant="secondary" onClick={() => fetchAI()} disabled={loadingAI}>
                            {loadingAI ? "Generating..." : "Get AI Insight"}
                        </Button>
                    </CardContent>
                </Card>
            )}

            {aiDate?.insight && (
                <Card>
                    <CardHeader>
                        <CardTitle>AI Insight</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{aiDate.insight}</p>
                    </CardContent>
                </Card>
            )}

            {weatherData?.remaining !== undefined && (
                <p className="text-sm text-muted-foreground">Remaining API calls today: {weatherData.remaining}</p>
            )}
        </div>
    );
}
