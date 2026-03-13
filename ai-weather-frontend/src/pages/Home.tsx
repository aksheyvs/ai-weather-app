import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <section className="px-6 py-28 text-center bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
                <h1 className="text-5xl font-bold mb-6 leading-tight">
                    AI Powered Weather <br /> Intelligence
                </h1>

                <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
                    Real-time weather insights, smart alerts, and AI-powered forecasting built for modern teams and
                    farmers.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        to="/register"
                        className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-semibold transition"
                    >
                        Get Started
                    </Link>

                    <Link
                        to="/login"
                        className="border border-slate-700 hover:border-slate-500 px-6 py-3 rounded-lg transition"
                    >
                        Login
                    </Link>
                </div>
            </section>

            <section className="px-6 py-20 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-14">Powerful Features</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 hover:border-blue-500 transition">
                        <h3 className="text-xl font-semibold mb-3">Real-time Weather</h3>
                        <p className="text-slate-400">Get accurate live weather updates powered by OpenWeather API.</p>
                    </div>

                    <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 hover:border-blue-500 transition">
                        <h3 className="text-xl font-semibold mb-3">AI Insights</h3>
                        <p className="text-slate-400">Smart recommendations generated from weather data using AI.</p>
                    </div>

                    <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 hover:border-blue-500 transition">
                        <h3 className="text-xl font-semibold mb-3">Smart Alerts</h3>
                        <p className="text-slate-400">
                            Receive notifications for extreme weather conditions instantly.
                        </p>
                    </div>

                    <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 hover:border-blue-500 transition">
                        <h3 className="text-xl font-semibold mb-3">Interactive Maps</h3>
                        <p className="text-slate-400">Visualize weather patterns using powerful map tools.</p>
                    </div>

                    <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 hover:border-blue-500 transition">
                        <h3 className="text-xl font-semibold mb-3">Multi Tenant</h3>
                        <p className="text-slate-400">Manage multiple organizations with isolated dashboards.</p>
                    </div>

                    <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 hover:border-blue-500 transition">
                        <h3 className="text-xl font-semibold mb-3">Secure Billing</h3>
                        <p className="text-slate-400">Subscription plans powered by Stripe for seamless payments.</p>
                    </div>
                </div>
            </section>

            <section className="px-6 py-20 bg-slate-900">
                <h2 className="text-3xl font-bold text-center mb-14">Simple Pricing</h2>

                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="bg-slate-950 border border-slate-800 p-8 rounded-xl">
                        <h3 className="text-xl font-semibold mb-4">Free</h3>

                        <p className="text-3xl font-bold mb-6">$0</p>

                        <ul className="space-y-3 text-slate-400 mb-8">
                            <li>Basic weather data</li>
                            <li>Limited alerts</li>
                            <li>Single dashboard</li>
                        </ul>

                        <Link
                            to="/register"
                            className="block text-center border border-slate-700 py-3 rounded-lg hover:border-blue-500 transition"
                        >
                            Start Free
                        </Link>
                    </div>

                    <div className="bg-slate-950 border-2 border-blue-600 p-8 rounded-xl scale-105">
                        <h3 className="text-xl font-semibold mb-4">Pro</h3>

                        <p className="text-3xl font-bold mb-6">$9/mo</p>

                        <ul className="space-y-3 text-slate-400 mb-8">
                            <li>Unlimited alerts</li>
                            <li>AI weather insights</li>
                            <li>Advanced analytics</li>
                            <li>Priority API access</li>
                        </ul>

                        <Link
                            to="/register"
                            className="block text-center bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-semibold transition"
                        >
                            Upgrade
                        </Link>
                    </div>
                </div>
            </section>

            <section className="px-6 py-24 text-center  bg-linear-to-r from-blue-600 to-purple-600">
                <h2 className="text-4xl font-bold mb-6">Start Your Weather Intelligence Today</h2>

                <p className="mb-8 text-blue-100">Join now and get smart weather alerts powered by AI.</p>

                <Link
                    to="/register"
                    className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                    Create Free Account
                </Link>
            </section>

            <footer className="px-6 py-10 text-center text-slate-500 border-t border-slate-800">
                <p>© 2026 WeatherAI. All rights reserved.</p>
            </footer>
        </div>
    );
}
