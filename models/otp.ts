import mongoose from "mongoose";

interface Otp {
  _id: string;
  email: string;
  otp: string;
  createdAt: Date;
  expiresAt: Date;
}

const otpSchema = new mongoose.Schema<Otp>(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
        type: Date,
        require: true
    },
  },
  { timestamps: true }
);

otpSchema.index({ expiresAt: 1}, {expireAfterSeconds: 0});
export const Otp = mongoose.model<Otp>("Otp", otpSchema);
