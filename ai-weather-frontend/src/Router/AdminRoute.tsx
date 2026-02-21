import { Navigate } from "react-router-dom";
import { getRole } from "../utils/auth";

export default function adminRouter({ children }: { children: React.ReactNode }) {
    const role = getRole();

    if (role !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}
