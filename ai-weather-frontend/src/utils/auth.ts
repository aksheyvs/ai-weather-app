import { jwtDecode } from "jwt-decode";

interface TokenPayload {
    userId: number;
    tenantId: string;
    role: string;
    exp: number;
}

export function getToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded = jwtDecode<TokenPayload>(token);

        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            localStorage.removeItem("token");
            return null;
        }

        return token;
    } catch {
        localStorage.removeItem("token");
        return null;
    }
}

export function getUserFromToken(): TokenPayload | null {
    const token = getToken();
    if (!token) return null;

    try {
        return jwtDecode<TokenPayload>(token);
    } catch {
        return null;
    }
}

export function getRole() {
    const user = getUserFromToken();
    return user?.role ?? null;
}

export function logout() {
    localStorage.removeItem("token");

    if (window.location.pathname !== "/login") {
        window.location.href = "/login";
    }
}