import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/authMiddleware.js";
import bcrypt from "bcrypt";
import { prisma } from "../db/postgresClient.js"

export async function inviteUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;
        const tenantId = req.user?.tenantId;
        const role = req.user?.role;

        if (!tenantId || !role) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (role !== "admin") {
            return res.status(403).json({
                message: "Only admin can invite users",
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name: email.split("@")[0],
                email,
                password: hashedPassword,
                role: "user",
                tenantId,
            },
        });

        return res.status(201).json({
            message: "User invited successfully",
            user: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
            },
        });

    } catch (err) {
        next(err)
    }
}