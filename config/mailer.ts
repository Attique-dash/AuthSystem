import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        user: process.env.User_Email,
        pass: process.env.User_password,
    },
});

export default transporter;