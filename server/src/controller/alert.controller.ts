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

        const { city, conditionType, operator, value, checkIntervalHours, } = req.body;

        if (!city || value === undefined) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const interval = checkIntervalHours || 4;

        const alert = await Alert.create({
            tenantId,
            city: city.toLowerCase(),
            conditionType,
            operator,
            value,
            checkIntervalHours: interval,
            nextCheckAt: new Date(
                Date.now() + interval * 60 * 60 * 1000
            ),
        });

        res.status(201).json(alert);
    } catch (err) {
        next(err);
    }
}

export async function updateAlert(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const tenantId = req.user?.tenantId;
        const { id } = req.params;

        if (!tenantId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!id || typeof id !== "string") {
            return res.status(400).json({ message: "Invalid alert ID" })
        }

        const updated = await Alert.findOneAndUpdate(
            { _id: id, tenantId },
            req.body,
            { new: true }
        );

        res.status(200).json(updated)

    } catch (err) {
        next(err);
    }
}

export async function deleteAlert(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const tenantId = req.user?.tenantId;
        const { id } = req.params;

        if (!tenantId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        if (!id || typeof id !== "string") {
            return res.status(400).json({ message: "Invalid alert ID" })
        }

        await Alert.findOneAndDelete({
            _id: id,
            tenantId,
        });

        res.status(200).json({
            message: "Alert deleted"
        });

    } catch (err) {
        next(err);
    }
}
