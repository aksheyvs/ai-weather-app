import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { logout } from "../utils/auth";

interface TokenPayload {
    exp: number;
}

export default function useTokenExpiry() {
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) return;

        try {
            const decoded = jwtDecode<TokenPayload>(token);

            const expiryTime = decoded.exp * 1000;
            const remainingTime = expiryTime - Date.now();

            if (remainingTime <= 0) {
                logout();
                return;
            }

            const timer = setTimeout(() => {
                logout();
            }, remainingTime);

            return () => clearTimeout(timer);
        } catch {
            logout();
        }
    }, []);
}