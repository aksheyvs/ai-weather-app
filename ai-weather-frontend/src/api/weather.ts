import api from "./axios";

export async function getWeather(city: string) {
    const res = await api.get(`/weather?city=${city}`);
    return res.data;
}

export type AIInsightCategory = "general" | "farming" | "outdoor"

export async function getAIInsight(city: string, category: AIInsightCategory) {
    const res = await api.get(`/ai/insights?city=${city}&category=${category}`);
    return res.data;
}