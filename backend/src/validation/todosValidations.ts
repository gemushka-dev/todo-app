import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const todoDTOSchema = z.object({
  title: z.string().max(64),
  content: z.string().optional(),
});

const todoUPDSchema = z.object({
  status: z.string().max(16),
});

export const todoDTOValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = todoDTOSchema.parse(req.body);
    req.body = parsed;
    next();
  } catch (e) {
    next(e);
  }
};

export const todoUpdValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = todoUPDSchema.parse(req.body);
    req.body = parsed;
    next();
  } catch (e) {
    next(e);
  }
};
