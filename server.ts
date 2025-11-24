import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import connectDB from "./config/db";
import usersRouter from "./routes/auth";
import passwordRouter from "./routes/password";
import errorHandler from "./middleware/error";
import { VercelRequest, VercelResponse } from 'vercel';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("AuthN API is running");
});

app.use("/api/auth", usersRouter);
app.use("/api/password", passwordRouter);

// Error handling middleware
app.use(errorHandler);

// For Vercel
const handler = async (req: VercelRequest, res: VercelResponse) => {
  return app(req as any, res as any);
};

// For local development
if (process.env.NODE_ENV !== 'production') {
  const start = async () => {
    try {
      await connectDB();
      const port = process.env.PORT || 5000;
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
  };
  
  start().catch(err => {
    console.error("Fatal error during startup:", err);
    process.exit(1);
  });
}

export default handler;