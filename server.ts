import "dotenv/config";
import express from "express";
import connectDB from "./config/db";
import usersRouter from "./routes/auth";
import passwordRouter from "./routes/password";
import errorHandler from "./middleware/error";

const app = express();

app.use(express.json());

async function start() {
  try {
    await connectDB();
  } catch (error) {
    console.log("Database connecting error");
    console.log(error);
  }

  app.get("/", (_req, res) => {
    res.status(200).send("Server is running");
  });

  app.use("/api/auth", usersRouter);
  app.use("/api/password", passwordRouter)

  app.use(errorHandler)

  const Port = process.env.PORT || 5000;
  app.listen(Port, () => console.log(`server running on port ${Port}`));
}

start().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});