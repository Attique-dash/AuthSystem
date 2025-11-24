import nodemailer, { Transporter } from "nodemailer";
import "dotenv/config";

if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('Missing required environment variables for email configuration');
}

const transporter: Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

transporter.verify((error) => {
    if (error) {
        console.error('Error with mailer configuration:', error);
    } else {
        console.log('Mailer is ready to send emails');
    }
});

export default transporter;