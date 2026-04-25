import * as s from "./usersService";
import { Request, Response, NextFunction } from "express";

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await s.getUserById(Number(req.params.id));
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const registred = await s.registerUser(req.body);
    res.status(201).json(registred);
  } catch (e) {
    next(e);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loginData = await s.loginUser({ ...req.body });
    res.cookie("access_token", loginData.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res
      .status(200)
      .json({ userId: loginData.userId, username: loginData.username });
  } catch (e) {
    next(e);
  }
};
