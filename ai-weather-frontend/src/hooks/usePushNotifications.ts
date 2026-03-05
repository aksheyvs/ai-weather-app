import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging"
import { messaging } from "../firebase";
import api from "../api/axios";

const VAPID_KEY = "BFC5-NCV4BYXEdgw557UDYsTS3b0w0SssR4btofAoF2UW8mV6RXx0AmaOc_54Z8KBfjrWHRsxMh-fM0AOEo3uVQ"

export default function usePushNotifications() {
    useEffect(() => {
        async function setupPush() {
            try {
                const permission = await Notification.requestPermission();

                if (permission !== "granted") {
                    console.log("Push permission denied");
                    return;
                }

                const token = await getToken(messaging, {
                    vapidKey: VAPID_KEY,
                });

                if (token) {
                    console.log("Push token:", token);

                    await api.post("/user/push-token", {
                        token,
                    });
                }
            } catch (err) {
                console.error("Push setup failed:", err);
            }
        }

        setupPush();

        onMessage(messaging, (payload) => {
            console.log("Foreground message:", payload);

            alert(payload.notification?.title + "\n" + payload.notification?.body)
        });

    }, []);
}