import { Transporter } from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';
import transporter from "../config/mailer";
import "dotenv/config";

export const sendEmail = async (to: string, subject: string, text: string): Promise<SentMessageInfo> => {
    if (!process.env.SMTP_USER) {
        throw new Error('SMTP_USER is not defined in environment variables');
    }
    
    return await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        text,
    });
};