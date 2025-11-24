import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof createHttpError.HttpError) {
        res.status(err.statusCode).json({ message: err.message });
    } else {
        res.status(500).json({ message: "Internal server error" });
    }
};
export default errorHandler;
