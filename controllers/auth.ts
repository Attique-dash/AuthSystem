import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { hashPassword, matchPassword } from "../utils/hashPassword";
import { User } from "../models/users";
import generate from "../utils/jwtToken";

export const CreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(createHttpError(400, "All fields are required"));
    }

    const userExisit = await User.findOne({ email });

    if (userExisit) {
      return next(createHttpError(400, "User Email Already Exisit"));
    }

    const hashed = await hashPassword(password);
    const createUser = await User.create({ name, email, password: hashed });

    res.status(201).json({ massage: "User Registered Successful", createUser });

  } catch (err) {
    next(createHttpError(400, "User Created Failed", err));
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await matchPassword(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const token = generate(user._id);
    res.json({ message: "Login Successful", token });

  } catch (err) {
    next(createHttpError(400, "User login Failed", err));
  }
};
