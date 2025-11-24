import "dotenv/config";
import express, { Request, Response } from "express";
import connectDB from "./config/db";
import usersRouter from "./routes/auth";
import passwordRouter from "./routes/password";
import errorHandler from "./middleware/error";

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

// Connect to MongoDB before handling any request (for Vercel)
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }
  
  try {
    await connectDB();
    isConnected = true;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};

// Middleware to ensure DB connection for each request
app.use(async (_req: Request, _res: Response, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    next(error);
  }
});

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

export default app;