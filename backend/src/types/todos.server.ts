export type TodoStatus = "pending" | "completed";

export type TodosResponse = {
  todoId: number;
  title: string;
  content: string | null;
  status: TodoStatus;
  userId: number;
  createdAt: string;
};
