import type { Response, NextFunction } from "express"
import type { AuthRequest } from "./authMiddleware.js"

export function authorize(...allowedRoles: string[]) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) return res.status(401).json({ message: "Unauthorized" });

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(401).json({ message: "Access forbidden: insufficient permissions" });
        }

        next();
    }
}