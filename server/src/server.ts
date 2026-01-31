import app from "./index.js"
import "./jobs/emailAlerts.cron.js"

const port: number = + (process.env.PORT ?? 3000)

app.listen(port, () => {
    console.log(`app listeing on port ${port}`)
});