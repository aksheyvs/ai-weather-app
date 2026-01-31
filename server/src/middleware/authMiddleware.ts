import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { prisma } from "../db/postgresClient.js"

interface JwtPaylord {
    userId: string;
    tenantId: string;
    role: string;
}

export interface AuthRequest extends Request {
    user?: JwtPaylord
}

export async function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authorization required" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) return res.status(401).json({ message: "Token missing" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPaylord;

        const user = await prisma.user.findUnique({ where: { id: decoded.userId } })

        if (!user) return res.status(401).json({ message: "Invalid or expired token" });

        req.user = { userId: user.id, tenantId: user.tenantId, role: user.role }

        next();
    } catch (err) {
        next(err);
    }
}