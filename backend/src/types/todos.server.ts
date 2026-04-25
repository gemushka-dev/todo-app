export type TodoStatus = "pending" | "completed";

export type TodoDB = {
  todo_id: number;
  title: string;
  content: string | null;
  status: TodoStatus;
  user_id: number;
  created_at: string;
};
