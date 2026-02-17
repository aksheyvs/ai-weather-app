import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const logout = useAuthStore((s) => s.logout);
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div className="flex justify-between items-center p-4 border-b">
            <div className="flex gap-4">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/billing">Billing</Link>
                <Link to="/alerts">Alerts</Link>
                <Link to="/invite">Invite</Link>
            </div>

            <Button variant="destructive" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
}
