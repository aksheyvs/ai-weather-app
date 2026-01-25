import jwt from "jsonwebtoken"

interface TokenPaylord {
    userId: string;
    tenantId: string;
    role: string;
}

export function generateToken(payload: TokenPaylord) {
    const secret = process.env.JWT_SECRET;

    if(!secret) {
        throw new Error("JWT_SECRET is not definet");
    }

    return jwt.sign(payload, secret, {expiresIn: "1h"});
}