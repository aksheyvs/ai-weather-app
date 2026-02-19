import axios from "axios";
import https from "https"
import Weather from "../model/mongo/weatherData.schema.js"
import { redis } from "../config/redis.js"

const API_KEY = process.env.OPENWEATHER_API_KEY;

const httpsAgent = new https.Agent({
    family: 4,
});

export async function getWeatherByCity(
    tenantId: string,
    city: string
) {
    const normalizedCity = city.toLowerCase();
    const cacheKey = `weather:${tenantId}:${normalizedCity}`;

    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    try {
        const response = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather",
            {
                httpsAgent,
                timeout: 10000,
                params: {
                    q: city,
                    appid: API_KEY,
                    units: "metric",
                },
            }
        );

        const mainCondition =
            response.data.weather[0].main.toLowerCase();

        const rainTypes = ["rain", "drizzle", "thunderstorm"];

        const isRain = rainTypes.some(type =>
            mainCondition.includes(type)
        );

        const weatherData = {
            tenantId,
            location: {
                lat: response.data.coord.lat,
                lon: response.data.coord.lon,
                city: response.data.name,
            },
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            rain: isRain,
            icon: response.data.weather[0].icon,
            condition: response.data.weather[0].main,
            source: "openweather",
            recordedAt: new Date(),
        }

        await Weather.create(weatherData);

        await redis.setEx(
            cacheKey,
            600,
            JSON.stringify(weatherData));

        return weatherData;

    } catch (error: any) {
        console.error(
            "OpenWeather connection failed:",
            error.message
        )

        if (error.response) {
            throw new Error(
                error.response.data?.message ||
                "Weather API error"
            );
        }

        throw new Error(
            "Weather service temporarily unavailable"
        );
    }
}