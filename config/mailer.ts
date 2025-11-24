import nodemailer, { Transporter } from "nodemailer";
import "dotenv/config";

if (!process.env.User_Email || !process.env.User_password) {
    throw new Error('Missing required environment variables for email configuration');
}

const transporter: Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.User_Email,
        pass: process.env.User_password,
    },
});

// Verify connection configuration
transporter.verify((error) => {
    if (error) {
        console.error('Error with mailer configuration:', error);
    } else {
        console.log('Mailer is ready to send emails');
    }
});

export default transporter;