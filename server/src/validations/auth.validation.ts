import Joi from "joi";
import type { Request, Response, NextFunction } from "express";

const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const loginSchma = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export function validateRegister(req: Request, res: Response, next: NextFunction) {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const message = error.details.map((d) => d.message).join(", ");
        return res.status(400).json({ message });
    };

    next();
}

export function validateLogin(req: Request, res: Response, next: NextFunction) {
    const { error } = loginSchma.validate(req.body, { abortEarly: false });

    if (error) {
        const message = error.details.map((d) => d.message).join(", ");
        return res.status(400).json({ message });
    }

    next();
}