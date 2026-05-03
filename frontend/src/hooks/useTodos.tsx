import { useState, useEffect, useRef } from "react";
import type { FormEvent } from "react";
import type { TodoItemType } from "../types/TodoItemType";

const url = "http://localhost:3500/todos";

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${url}/todos`, {
        credentials: "include",
      });
      if (response.ok) {
        const data: TodoItemType[] = await response.json();
        setTodos(data);
      }
    } catch (error) {
      console.error("Failed to fetch todos", error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      title: titleRef.current?.value,
      content: contentRef.current?.value,
    };

    try {
      const response = await fetch(`${url}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return alert(errorData.message);
      }

      if (titleRef.current) titleRef.current.value = "";
      if (contentRef.current) contentRef.current.value = "";

      fetchTodos();
    } catch (err) {
      alert("Network error");
    }
  };

  const updateTodoStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) fetchTodos();
      else alert("Update failed");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) fetchTodos();
      else alert("Delete failed");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    titleRef,
    contentRef,
    handleSubmit,
    updateTodoStatus,
    deleteTodo,
  };
};
