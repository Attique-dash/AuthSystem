import express from "express";
import { forgotPassword, verifyOtp, resetPassword } from "../controllers/password";

const passwordRouter = express.Router();

passwordRouter.post("/forgot", forgotPassword)
passwordRouter.post("/verify", verifyOtp)
passwordRouter.post("/reset", resetPassword)

export default passwordRouter;