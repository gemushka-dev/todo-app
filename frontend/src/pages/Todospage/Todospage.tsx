import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import styles from "../../style/todos.module.css";
import type { TodoItemType } from "../../types/TodoItemType";

export const Todospage = () => {
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);

  async function fetchTodos() {
    try {
      const response = await fetch("http://localhost:3500/todos/todos", {
        credentials: "include",
      });
      if (response.ok) {
        const data: Array<TodoItemType> = await response.json();
        setTodos(data);
      }
    } catch (error) {
      console.error("Failed to fetch todos", error);
    }
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      title: titleRef.current?.value,
      content: contentRef.current?.value,
    };
    const response = await fetch("http://localhost:3500/todos/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return alert(
        response.status == 400 ? "Check size of text" : "Not a member",
      );
    }
    fetchTodos();
  }

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <>
      <section className={styles.todos}>
        <form className={styles.todos__form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Todo title"
            className={styles.form__input}
            ref={titleRef}
          />
          <input
            placeholder="Content"
            className={styles.form__input}
            ref={contentRef}
          ></input>
          <button className={styles.form__button}>Create</button>
        </form>

        <div className={styles.todos__list}>
          {todos.length > 0 ? (
            todos.map((el) =>
              el.status === "pending" ? (
                <div className={styles.todos__item} key={el.todoId}>
                  <h3 className={styles.todo__title}>{el.title}</h3>
                  <p className={styles.todo__content}>{el.content}</p>
                  <div className="btns">
                    <button
                      className={styles.todo__btn}
                      onClick={() => {
                        async function updTodo() {
                          const response = await fetch(
                            `http://localhost:3500/todos/${el.todoId}`,
                            {
                              method: "PUT",
                              credentials: "include",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({ status: "completed" }),
                            },
                          );
                          if (!response.ok) {
                            return alert("Something went wrong");
                          }
                          fetchTodos();
                        }
                        updTodo();
                      }}
                    >
                      ✅
                    </button>
                    <button
                      className={styles.todo__btn}
                      onClick={() => {
                        async function deleteTodo() {
                          const response = await fetch(
                            `http://localhost:3500/todos/${el.todoId}`,
                            { method: "DELETE", credentials: "include" },
                          );
                          if (!response) {
                            return alert("Something went wrong");
                          }
                          fetchTodos();
                        }
                        deleteTodo();
                      }}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ) : null,
            )
          ) : (
            <h3>There are no todos</h3>
          )}
        </div>
      </section>
    </>
  );
};
