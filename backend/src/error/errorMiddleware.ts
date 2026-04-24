import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { HttpError } from "./HttpError";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation Error",
      issues: err.issues,
    });
  }
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res.status(500).json({ message: "Internal Server Error" });
};
