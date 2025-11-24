import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { Otp } from "../models/otp";
import { User } from "../models/users";
import { sendEmail } from "../utils/sendMail";
import { hashPassword } from "../utils/hashPassword";

const otpIntervals: Record<string, NodeJS.Timeout> = {};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User Not Found" });
      return;
    }

    const generateAndSendOtp = async () => {
      const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
      const expiry = new Date(Date.now() + 2 * 60 * 1000);

      await Otp.deleteMany({ email });
      await Otp.create({ email, otp: otpCode, expiresAt: expiry });

      await sendEmail(email, "Password Reset OTP", `Your OTP is ${otpCode}`);
      console.log(`OTP sent to ${email}: ${otpCode}`);
    };

    await generateAndSendOtp();
    res.json({ message: "OTP sent to mail" });

    if (otpIntervals[email]) {
      clearInterval(otpIntervals[email]);
    }

    const intervalId = setInterval(async () => {
      await generateAndSendOtp();
    }, 2 * 60 * 1000);

    otpIntervals[email] = intervalId;

    setTimeout(() => {
      clearInterval(intervalId);
      delete otpIntervals[email];
      console.log(`Stopped sending OTPs to ${email} (10 min timeout)`);
    }, 10 * 60 * 1000);
  } catch (err) {
    next(createHttpError(400, "Forgot Password Failed", err));
  }
};

export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      res.status(400).json({ message: "Invalid or expired OTP" });
      return;
    }

    if (otpIntervals[email]) {
        clearInterval(otpIntervals[email]);
        delete otpIntervals[email];
      }

    res.json({ message: "OTP verified" });
  } catch (err) {
    next(createHttpError(400, "Verify OTP Failed", err));
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, otp, newPassword } = req.body;

    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      res.status(400).json({ message: "Invalid or expired OTP" });
      return;
    }

    const hashed = await hashPassword(newPassword);
    await User.findOneAndUpdate({ email }, { password: hashed });

    res.json({ message: "Password Reset Successfully" });
  } catch (err) {
    next(createHttpError(400, "Reset Password Failed", err));
  }
};
