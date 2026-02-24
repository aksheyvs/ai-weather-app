import cron from "node-cron"
import Alert from "../model/mongo/alerts.schema.js"
import Weather from "../model/mongo/weatherData.schema.js"
import { prisma } from "../db/postgresClient.js"
import { sendWeatherEmail } from "../services/email.service.js";
import { evaluateCondition } from "../utils/evaluateCondition.js";

cron.schedule("*/5 * * * *", async () => {
    console.log("Checking condition-based alerts...");

    try {
        const alerts = await Alert.find({ triggered: false });

        for (const alert of alerts) {

            if (!alert.city) continue;

            const latestWeather = await Weather.findOne({
                tenantId: alert.tenantId,
                "location.city": alert.city,
            }).sort({ recordedAt: -1 });

            if (!latestWeather) continue;

            let actualValue = 0;

            switch (alert.conditionType) {
                case "temperature":
                    actualValue = latestWeather.temperature ?? 0;
                    break;
                case "humidity":
                    actualValue = latestWeather.humidity ?? 0;
                    break;
                case "rain":
                    actualValue = latestWeather.rain ? 1 : 0;
                    break;
            }

            const conditionMet = evaluateCondition(
                actualValue,
                alert.operator,
                alert.value
            );

            if (!conditionMet) continue;

            const users = await prisma.user.findMany({
                where: {
                    tenantId: alert.tenantId,
                    isActive: true,
                    deletedAt: null,
                },
            });

            for (const user of users) {
                await sendWeatherEmail(
                    user.email,
                    "Weather Alert Triggered",
                    `
                    City: ${alert.city}
                    condition: ${alert.conditionType} ${alert.operator} ${alert.value}
                    Current value: ${actualValue}
                    `
                );
            }

            alert.triggered = true;
            alert.lastTriggeredAt = new Date();
            await alert.save();

            console.log(`Alert triggered for city ${alert.city}`);
        }
    } catch (err) {
        console.error("Condition alert cron failed:", err);
    }
})