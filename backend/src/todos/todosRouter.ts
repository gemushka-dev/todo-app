import { Router } from "express";
import {
  createTodo,
  getTodoById,
  getTodosByUserId,
  updateTodo,
  deleteTodo,
} from "./todosController";
import { authMiddleware } from "../auth/authMiddleware";
import {
  todoDTOValidation,
  todoUpdValidation,
} from "../validation/todosValidations";

export const todosRouter = Router();

todosRouter.get("/todos", authMiddleware, getTodosByUserId);

todosRouter.get("/:id", authMiddleware, getTodoById);

todosRouter.post("/create", authMiddleware, todoDTOValidation, createTodo);

todosRouter.put("/:id", authMiddleware, todoUpdValidation, updateTodo);

todosRouter.delete("/:id", authMiddleware, deleteTodo);
