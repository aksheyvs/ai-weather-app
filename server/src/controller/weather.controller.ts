import type {Response, NextFunction} from "express"
import type { AuthRequest } from "../middleware/authMiddleware.js"
import { getWeatherByCity } from "../services/weather.service.js"

export async function getWeather(req: AuthRequest, res:Response, next:  NextFunction) {
    try{
        const {city} = req.query;
        const tenantId = req.user?.tenantId;

        if(!city) return res.status(400).json({message: "City is required"});

        if(!tenantId) return res.status(400).json({message: "Unauthorized"});

        const weather = await getWeatherByCity(tenantId, city as string);

        res.status(200).json(weather);
    } catch(err) {
        next(err);
    }
}