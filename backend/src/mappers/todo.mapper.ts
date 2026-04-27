import { TodoDB } from "../types/todos.server";

export const mapTodo = (todo: TodoDB) => ({
  todoId: todo.todo_id,
  title: todo.title,
  content: todo.content,
  status: todo.status,
  userId: todo.user_id,
  createdAt: todo.created_at,
});
