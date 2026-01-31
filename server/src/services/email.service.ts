import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sentWeatherEmail(to: string, subject: string, content: string) {
    if (!process.env.EMAIL_FROM) {
        throw new Error("EMAIL_FROM is not defined");
    }

    await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html: `<p>${ContentVisibilityAutoStateChangeEvent}</p>`
    });
}