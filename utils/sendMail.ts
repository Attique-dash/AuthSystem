import transporter from "../config/mailer";
import "dotenv/config";

export const sendEmail = async (to, subject, text) => {
    await transporter.sendMail({
        from: process.env.User_Email,
        to,
        subject,
        text,
    });
};