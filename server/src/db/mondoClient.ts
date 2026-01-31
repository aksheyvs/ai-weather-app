import { connect } from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) throw Error("MongoDb URL not provided in env variables");

export async function runMongo() {
    try {
        await connect(mongoUrl as string)
        console.log("✅ Connected to MongoDB")
    } catch (err) {
        console.error("❌ MongoDB connection failed :", (err as Error).message)
    }
};