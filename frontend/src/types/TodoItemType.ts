export type TodoItemType = {
  todoId: number;
  title: string;
  content: string;
  status: "pending" | "completed";
  userId: number;
  createdAt: string;
};
