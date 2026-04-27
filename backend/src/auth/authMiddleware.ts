import { Request, Response, NextFunction } from "express";
import { HttpError } from "../error/HttpError";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";
import { unknown } from "zod";
import { AuthRequest } from "../types/authRequest";

config();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      throw new HttpError("Not Authenticated", 401);
    }
    const payload = verify(token, String(process.env.JWT_SECRET)) as {
      userId: number;
    };
    (req as AuthRequest).user = payload;
    next();
  } catch (e) {
    next(e);
  }
};
