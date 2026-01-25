import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL;

if(!redisUrl) throw new Error("Redis URL not provided in env variables");

export const redis = createClient({
    url: redisUrl,
});

redis.on("error", (err) => {
    console.error("Redis Error", err);
});

await redis.connect();