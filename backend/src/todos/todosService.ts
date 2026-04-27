import { db } from "../database/database";
import { HttpError } from "../error/HttpError";
import { mapTodo } from "../mappers/todo.mapper";
import { TodosDTO } from "../types/todos.client";
import { TodoStatus } from "../types/todos.server";

export const getTodosByUserId = async (userId: number) => {
  return (await db.getTodosByUserId(userId)).map((todo) => mapTodo(todo));
};

export const getTodoById = async (todoId: number, userId: number) => {
  const todo = await db.getTodoById(todoId, userId);
  if (!todo) {
    throw new HttpError("Not Found", 404);
  }
  return mapTodo(todo);
};

export const createTodo = async (todo: TodosDTO) => {
  return db.createTodo(todo);
};

export const updateTodo = async (
  todoId: number,
  userId: number,
  status: TodoStatus,
) => {
  const existing = await db.getTodoById(todoId, userId);
  if (!existing) {
    throw new HttpError("Not Found", 404);
  }
  return db.updateTodoStatus(todoId, userId, status);
};

export const deleteTodo = async (userId: number, todoId: number) => {
  const existing = await db.deleteTodo(userId, todoId);
  if (!existing) {
    throw new HttpError("Not Found", 404);
  }
  return db.deleteTodo(userId, todoId);
};
