import { Transporter } from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';
import transporter from "../config/mailer";
import "dotenv/config";

export const sendEmail = async (to: string, subject: string, text: string): Promise<SentMessageInfo> => {
    if (!process.env.User_Email) {
        throw new Error('User_Email is not defined in environment variables');
    }
    
    return await transporter.sendMail({
        from: process.env.User_Email,
        to,
        subject,
        text,
    });
};