import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/authMiddleware.js";
import Alert from "../model/mongo/alerts.schema.js";

export async function getAlerts(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const tenantId = req.user?.tenantId;

        if (!tenantId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const alerts = await Alert.find({
            tenantId,
        }).sort({ createdAt: -1 });

        return res.status(200).json(alerts);
    } catch (err) {
        next(err)
    }
}

export async function createConditionAlert(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const tenantId = req.user?.tenantId;

        if (!tenantId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { city, conditionType, operator, value } = req.body;

        if (!city || !conditionType || !operator || value === undefined) {
            return res.status(400).json({
                message: "city, conditionType, operator and value required"
            })
        }

        const alert = await Alert.create({
            tenantId,
            city: city.toLowerCase(),
            conditionType,
            operator,
            value,
        });

        res.status(201).json(alert);
    } catch (err) {
        next(err);
    }
}