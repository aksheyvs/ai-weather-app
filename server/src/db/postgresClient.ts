import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function runPostgres() {
    try{
        await prisma.$connect();
        console.log("✅ PostgreSQL connected successfully!")
    } catch (err) {
        console.log("❌ PostgreSQL connection failed :", (err as Error).message)
    }
};