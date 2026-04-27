import { AuthRequest } from "../types/authRequest";
import * as s from "./todosService";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const getTodosByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as AuthRequest).user["userId"];
    res.status(200).json(await s.getTodosByUserId(userId));
  } catch (e) {
    next(e);
  }
};

export const getTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as AuthRequest).user["userId"];

    res.status(200).json(await s.getTodoById(Number(req.params.id), userId));
  } catch (e) {
    next(e);
  }
};

export const createTodo = async (req: Request, res: Response) => {
  const userId = (req as AuthRequest).user["userId"];

  res.status(201).json(await s.createTodo({ ...req.body, userId: userId }));
};

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as AuthRequest).user["userId"];

    res
      .status(200)
      .json(await s.updateTodo(Number(req.params.id), userId, req.body.status));
  } catch (e) {
    next(e);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as AuthRequest).user["userId"];

    await s.deleteTodo(userId, Number(req.params.id));
    res.status(200).json({ message: "Deleted" });
  } catch (e) {
    next(e);
  }
};
