import { useNavigate } from "react-router-dom";
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
            <h1 className="font-bold">AI Weather</h1>

            <Button variant="destructive" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
}
