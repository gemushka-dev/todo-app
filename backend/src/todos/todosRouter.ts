import { Router } from "express";
import {
  createTodo,
  getTodoById,
  getTodosByUserId,
  updateTodo,
  deleteTodo,
} from "./todosController";

export const todosRouter = Router();

todosRouter.get("/todos", getTodosByUserId);

todosRouter.get("/:id", getTodoById);

todosRouter.post("/create", createTodo);

todosRouter.put("/:id", updateTodo);

todosRouter.delete("/:id", deleteTodo);
