import axios from "axios";

const GEMINI_API_URL = process.env.GEMINI_API_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

interface AIInput {
    city: string;
    temperature: number;
    humidity: number;
    rain: boolean;
    category: "farming" | "outdoor" | "general";
}

export async function generateAIInsight(input: AIInput) {
    const prompt =
        `
    Weather data:
    City: ${input.city}
    Temperature: ${input.temperature}°C
    Humidity: ${input.humidity}%
    Rain: ${input.rain ? "Yes" : "No"}

    Give ${input.category} advice in simple language.
    `;

    const response = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
            contents: [
                {
                    parts: [{ text: prompt }],
                },
            ],
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return response.data.candidates[0].content.parts[0].text;
}