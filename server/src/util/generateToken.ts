import jwt from "jsonwebtoken"

interface TokenPayload {
    userId: string;
    tenantId: string;
    role: string;
}

export function generateToken(payload: TokenPayload) {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not define");
    }

    return jwt.sign(payload, secret, { expiresIn: "5h" });
}