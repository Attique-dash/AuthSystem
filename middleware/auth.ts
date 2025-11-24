import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { User } from "../models/users";
import "dotenv/config";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){

        try{

            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.jwt_secret as string) as { id: string };

            (req as any).user = await User.findById(decoded.id).select("-password");
            return next();
        }catch(err){
            next(createHttpError(400, "Forgot Password Failed", err));
        }
    }

    if (!token){
         res.status(401).json({ message: "Not authorized, no token" });
         return;
    }

};
