import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not defined");
}

const resent = new Resend(process.env.RESEND_API_KEY);

if (!process.env.EMAIL_FROM) {
    throw new Error("EMAIL_FROM is not defined")
}

const emailFrom = process.env.EMAIL_FROM;

export async function sentWeatherEmail(to: string, subject: string, message: string) {
    try {
        const response = await resent.emails.send({
            from: `Weather App <${emailFrom}>`,

            to,
            subject,

            html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #2563eb;">${subject}</h2>

            <div style="margin-top: 15px; font-size: 16px;">
            ${message.replace(/\n/g, "<br/>")}
            </div>

            <hr style="margin: 20px 0; />

            <p style="font-size: 12px; color: gray;">
            This alert was generated automatically by your AI Weather App.
            </p>
            </div>
            `
        });

        console.log(`Email successfully sent to ${to}`)

        return response;

    } catch (error: any) {
        console.error("Failed to send email:", error?.message);
        throw new Error("Email sending failed");
    }
}