import { TodoStatus } from "./todos.server";

export type TodosDTO = {
  title: string;
  content: string | null;
  status?: TodoStatus;
  userId: number;
};
