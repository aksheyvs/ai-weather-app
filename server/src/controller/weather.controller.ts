import type { Response, NextFunction } from "express"
import type { AuthRequest } from "../middleware/authMiddleware.js"
import { getWeatherByCity } from "../services/weather.service.js"

export async function getWeather(
    req: AuthRequest,
    res: Response,
    next: NextFunction) {
    try {
        const rawCity = req.query.city;
        const tenantId = req.user?.tenantId;

        if (typeof rawCity !== "string") {
            return res.status(400).json({ message: "City is required" });
        }

        if (!tenantId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const city = rawCity.toLowerCase();

        const weatherData = await getWeatherByCity(tenantId, city);

        return res.status(200).json({
            weather: weatherData,
            remaining: (req as any).remainingUsage,
        });

    } catch (err) {
        next(err);
    }
}