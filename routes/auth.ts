import express from "express";
import { CreateUser, loginUser } from "../controllers/auth";
import { protect } from "../middleware/auth";

const usersRouter = express.Router();

usersRouter.post("/register", CreateUser)
usersRouter.post("/login", loginUser)

export default usersRouter;