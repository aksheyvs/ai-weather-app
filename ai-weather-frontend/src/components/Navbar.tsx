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
        <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                <h1 className="font-bold text-lg">
                    Weather<span className="text-blue-500">AI</span>
                </h1>

                <nav className="flex items-center gap-6 text-sm">
                    <Link to="/dashboard" className="text-slate-300 hover:text-white transition">
                        Dashboard
                    </Link>

                    <Link to="/billing" className="text-slate-300 hover:text-white transition">
                        Billing
                    </Link>

                    <Link to="/alerts" className="text-slate-300 hover:text-white transition">
                        Alerts
                    </Link>

                    <Link to="/invite" className="text-slate-300 hover:text-white transition">
                        Invite
                    </Link>
                </nav>

                <Button variant="destructive" size="sm" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </header>
    );
}
