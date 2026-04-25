import { Router } from "express";
import { getUserById, loginUser, registerUser } from "./usersController";

export const usersRouter = Router();

usersRouter.get("/:id", getUserById);
usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);
