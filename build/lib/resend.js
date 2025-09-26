import { Resend } from "resend";
/**
 * Send an email with a summary of conversation
 * @param {string} to - The recipient email address
 * @param {string} subject - The email subject
 * @param {string} body - The email body
 * @returns {Promise<any>}
 */
export async function sendEmail(to, subject, body) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY || "test");
        const response = await resend.emails.send({
            from: "info@example.com",
            to,
            subject,
            text: body,
        });
        if (!response?.data || !response.data.id)
            throw new Error("Failed to send email");
        console.log(`Email sent to: ${to} with subject: ${subject}`);
        return {
            content: [
                {
                    type: "text",
                    text: `Email sent with ID: ${response.data.id}`,
                },
            ],
        };
    }
    catch (error) {
        console.error(`Error sending email to: ${to} with subject: ${subject}`, error);
        return {
            content: [
                {
                    type: "text",
                    text: `Error sending email to ${to}`,
                },
            ],
        };
    }
}
