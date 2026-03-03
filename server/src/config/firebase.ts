import admin from "firebase-admin"
import serviceAccount from "../config/ai-weather-app-5c958-firebase-adminsdk-fbsvc-e7cc19fa62.json" with {type: "json"}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
});

export const firebase = admin;