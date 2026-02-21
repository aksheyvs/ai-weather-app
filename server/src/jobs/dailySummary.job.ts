import cron from "node-cron"
import Alert from "../model/mongo/alerts.schema.js"
import { sentWeatherEmail } from "../services/email.service.js"

cron.schedule("*/10 * * * *", async () => {
    try {
        const now = new Date();

        const alerts = await Alert.find({
            sent: false,
            scheduledFor: { $lte: now },
        });

        for (const alert of alerts) {
            try {
                await sentWeatherEmail(
                    alert.email,
                    "Weather Alert",
                    alert.message
                );

                alert.sent = true;
                await alert.save();

            } catch (err) {
                console.error("Failed to send email alert:", err);
            }
        }
    } catch (err) {
        console.error("Cron job error:", err);
    }
})