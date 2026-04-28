import { Router } from "express";
import { getUserById, loginUser, registerUser } from "./usersController";
import {
  userDTOValidation,
  userVerifyValidation,
} from "../validation/usersValidation";

export const usersRouter = Router();

usersRouter.get("/:id", getUserById);
usersRouter.post("/register", userDTOValidation, registerUser);
usersRouter.post("/login", userVerifyValidation, loginUser);
