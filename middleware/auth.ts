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
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

            (req as any).user = await User.findById(decoded.id).select("-password");
            return next();
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createHttpError(400, `Authentication failed: ${err.message}`));
            } else {
                next(createHttpError(400, 'Authentication failed'));
            }
        }
    }

    if (!token){
         res.status(401).json({ message: "Not authorized, no token" });
         return;
    }

};
