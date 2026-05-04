import { useState } from "react";
import { ActiveTodos } from "../../components/ActiveTodos";
import { CompletedTodos } from "../../components/CompletedTodos";
import { useTodos } from "../../hooks/useTodos";
import styles from "../../style/todos.module.css";

export const Todospage = () => {
  const [isActive, setIsActive] = useState(true);
  const {
    todos,
    titleRef,
    contentRef,
    handleSubmit,
    updateTodoStatus,
    deleteTodo,
  } = useTodos();

  return (
    <section className={styles.todos}>
      <form className={styles.todos__form} onSubmit={handleSubmit}>
        <input
          type="text"
          ref={titleRef}
          className={styles.form__input}
          placeholder="Title"
        />
        <input
          ref={contentRef}
          className={styles.form__input}
          placeholder="Content"
        />
        <button className={styles.form__button}>Create</button>
      </form>

      <div className={styles.todos_btns}>
        <button
          className={
            isActive
              ? `${styles.content__btn} ${styles.active}`
              : styles.content__btn
          }
          onClick={() => setIsActive(true)}
        >
          Active
        </button>
        <button
          className={
            isActive
              ? styles.content__btn
              : `${styles.content__btn} ${styles.active}`
          }
          onClick={() => setIsActive(false)}
        >
          Completed
        </button>
      </div>

      {isActive ? (
        <ActiveTodos
          todos={todos}
          styles={styles}
          updateTodoStatus={updateTodoStatus}
          deleteTodo={deleteTodo}
        />
      ) : (
        <CompletedTodos todos={todos} styles={styles} deleteTodo={deleteTodo} />
      )}
    </section>
  );
};
