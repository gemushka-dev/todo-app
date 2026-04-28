import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const userDTOSchema = z.object({
  username: z.string().min(3).max(64),
  userEmail: z.email(),
  password: z.string().min(8),
});

const userVerifySchema = z.object({
  userEmail: z.email(),
  password: z.string().min(8),
});

export const userDTOValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = userDTOSchema.parse(req.body);
    req.body = parsed;
    next();
  } catch (e) {
    next(e);
  }
};

export const userVerifyValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = userVerifySchema.parse(req.body);
    req.body = parsed;
    next();
  } catch (e) {
    next(e);
  }
};
