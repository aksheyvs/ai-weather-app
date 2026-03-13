import Navbar from "../components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <main className="max-w-6xl mx-auto p-6">{children}</main>
        </div>
    );
}
