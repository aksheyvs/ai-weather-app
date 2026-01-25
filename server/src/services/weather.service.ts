import axios from "axios";
import Weather from "../model/mongo/weatherData.schema.js"
import {redis} from "../config/redis.js"

const API_KEY = process.env.OPENWEATHER_API_KEY;

export async function getWeatherByCity(tenantId: string, city: string) {
    const cacheKey = `weather:${tenantId}:${city.toLowerCase()}`;

    const cached = await redis.get(cacheKey);

    if(cached) return JSON.parse(cached);

    const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
            params: {
                q: city,
                appid: API_KEY,
                units: "metric",
            },
        }
    );

    const weatherData = {
        tenantId,
        location:{
            lat: response.data.coord.lat,
            lon: response.data.coord.lon,
            city: response.data.name,
        },
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        rain: Boolean(response.data.rain),
        source: "openweather",
        recordedAt: new Date(),
    }

    await Weather.create(weatherData);

    await redis.setEx(cacheKey, 600, JSON.stringify(weatherData));

    return weatherData;
}