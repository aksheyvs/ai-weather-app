import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/authMiddleware.js";
import Weather from "../model/mongo/weatherData.schema.js";
import AiInsight from "../model/mongo/aiInsights.schema.js";
import { generateAIInsight } from "../services/ai.service.js";

export async function getAIInsight(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const rawCity = req.query.city;

        if (typeof rawCity !== "string") return res.status(400).json({ message: "City is required" });

        const city = rawCity.toLowerCase();

        const rawCategory = req.query.category;
        const allowedCategories = ["farming", "outdoor", "general"] as const;

        const category = typeof rawCategory === "string" && allowedCategories.includes(rawCategory as any) ? rawCategory : "general";

        const tenantId = req.user?.tenantId;

        if (!tenantId) return res.status(401).json({ message: "Unauthorized" });


        const latestWeather = await Weather.findOne({
            tenantId,
            "location.city": city,
        }).sort({ recordedAt: -1 });

        if (!latestWeather) return res.status(404).json({ message: "No weather data fount for this city" });

        if (!latestWeather.location?.city ||
            latestWeather.temperature == null ||
            latestWeather.humidity == null ||
            latestWeather.rain == null
        ) {
            return res.status(500).json({ message: "Incomplete weather data for AI processing" });
        }

        const insightText = await generateAIInsight({
            city: latestWeather.location.city,
            temperature: latestWeather.temperature,
            humidity: latestWeather.humidity,
            rain: latestWeather.rain,
            category: category as "farming" | "outdoor" | "general",
        });

        const insight = await AiInsight.create({
            tenantId,
            city: latestWeather.location.city,
            weatherSnapshot: {
                temperature: latestWeather.temperature,
                humidity: latestWeather.humidity,
                rain: latestWeather.rain,
            },
            insight: insightText,
            category,
        });

        res.status(200).json(insight);
    } catch (err) {
        next(err);
    }
}