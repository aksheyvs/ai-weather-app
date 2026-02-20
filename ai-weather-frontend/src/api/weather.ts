import api from "./axios";

export async function getWeather(city: string) {
    const res = await api.get(`/weather?city=${city}`);
    return res.data;
}

export async function getAIInsight(city: string) {
    const res = await api.get(`/ai/insights?city=${city}&category=general`);
    return res.data;
}