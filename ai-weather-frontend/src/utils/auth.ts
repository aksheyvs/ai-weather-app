import { jwtDecode } from "jwt-decode";

interface TokenPayload {
    userId: number;
    tenantId: string;
    role: string;
    exp: number;
}

export function getToken() {
    return localStorage.getItem("token");
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
    window.location.href = "/login";
}