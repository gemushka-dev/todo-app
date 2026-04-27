import { Router } from "express";
import {
  createTodo,
  getTodoById,
  getTodosByUserId,
  updateTodo,
  deleteTodo,
} from "./todosController";
import { authMiddleware } from "../auth/authMiddleware";

export const todosRouter = Router();

todosRouter.get("/todos", authMiddleware, getTodosByUserId);

todosRouter.get("/:id", authMiddleware, getTodoById);

todosRouter.post("/create", authMiddleware, createTodo);

todosRouter.put("/:id", authMiddleware, updateTodo);

todosRouter.delete("/:id", authMiddleware, deleteTodo);
