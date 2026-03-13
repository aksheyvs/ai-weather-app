import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../db/postgresClient.js";
import { generateToken } from "../util/generateToken.js";

export async function registerUser(req: Request, res: Response, next: NextFunction) {

    try {
        const { name, password } = req.body;
        const email = req.body.email.toLowerCase().trim();

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const freePlan = await prisma.plan.findFirst({
            where: { name: "Free" },
        });

        if (!freePlan) {
            return res.status(500).json({
                message: "Free plan not configured"
            })
        }

        await prisma.$transaction(async (tx) => {
            const tenant = await tx.tenant.create({
                data: {
                    name: `${name}'s Workspace`,
                },
            });

            await tx.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role: "admin",
                    tenantId: tenant.id,
                },
            });

            await tx.billing.create({
                data: {
                    tenantId: tenant.id,
                    planId: freePlan.id,
                    status: "active",
                },
            });
        });

        return res.status(201).json({ message: "User registered successfully" });

    } catch (err) {
        next(err);
    }
};

export async function loginUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (user.deletedAt !== null) {
            return res.status(403).json({
                message: "Account has been deleted",
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                message: "Account is disabled",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const token = generateToken({
            userId: user.id,
            tenantId: user.tenantId,
            role: user.role,
        });

        return res.status(200).json({
            message: "Login successful",
            token,
        });
    } catch (err) {
        next(err);
    }
}