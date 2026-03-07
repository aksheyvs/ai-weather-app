import cron from "node-cron"
import Alert from "../model/mongo/alerts.schema.js"
import { prisma } from "../db/postgresClient.js"
import { getWeatherByCity } from "../services/weather.service.js";
import { sendWeatherEmail } from "../services/email.service.js";
import { evaluateCondition } from "../utils/evaluateCondition.js";
import { sendPushNotification } from "../services/push.service.js";

cron.schedule("*/1 * * * *", async () => {
    console.log("Checking condition-based alerts...");

    try {
        const now = new Date();

        const alerts = await Alert.find({
            active: true,
            nextCheckAt: { $lte: now },
        });

        for (const alert of alerts) {

            const weather = await getWeatherByCity(
                alert.tenantId,
                alert.city
            )

            let actualValue = 0;

            switch (alert.conditionType) {
                case "temperature":
                    actualValue = weather.temperature ?? 0;
                    break;
                case "humidity":
                    actualValue = weather.humidity ?? 0;
                    break;
                case "rain":
                    actualValue = weather.rain ? 1 : 0;
                    break;
            }

            const conditionMet = evaluateCondition(
                actualValue,
                alert.operator,
                alert.value
            );

            if (conditionMet) {

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

                    if (alert.pushEnabled && user.pushToken) {
                        await sendPushNotification(
                            user.pushToken,
                            "Weather Alert",
                            `Condition met in ${alert.city}`
                        );
                    }
                }

                alert.active = false;
                alert.lastTriggeredAt = new Date();
                await alert.save();
            } else {
                alert.nextCheckAt = new Date(
                    Date.now() + alert.checkIntervalHours * 60 * 60 * 1000
                );
                await alert.save();
            }
        }

    } catch (err) {
        console.error("Interval alert corn failed:", err);
    }
});