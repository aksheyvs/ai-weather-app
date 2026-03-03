import { firebase } from "../config/firebase.js"

export async function sendPushNotification(token: string, title: string, body: string) {
    await firebase.messaging().send({
        token,
        notification: {
            title,
            body,
        },
    });
}