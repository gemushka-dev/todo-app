import { useTodos } from "../../hooks/useTodos";
import styles from "../../style/todos.module.css";

export const Todospage = () => {
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

      <div className={styles.todos__list}>
        {todos.length > 0 ? (
          todos.map(
            (el) =>
              el.status === "pending" && (
                <div className={styles.todos__item} key={el.todoId}>
                  <h3 className={styles.todo__title}>{el.title}</h3>
                  <p className={styles.todo__content}>{el.content}</p>
                  <div className="btns">
                    <button
                      className={styles.todo__btn}
                      onClick={() => updateTodoStatus(el.todoId, "completed")}
                    >
                      ✅
                    </button>
                    <button
                      className={styles.todo__btn}
                      onClick={() => deleteTodo(el.todoId)}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ),
          )
        ) : (
          <h3>There are no todos</h3>
        )}
      </div>
    </section>
  );
};
