import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Router/ProtectedRoute";
import Layout from "./layout/Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import Alerts from "./pages/Alerts";
import Invite from "./pages/Invite";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/billing"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Billing />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/alerts"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Alerts />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/invite"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Invite />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
