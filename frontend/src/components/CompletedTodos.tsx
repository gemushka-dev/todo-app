import type { TodoItemType } from "../types/TodoItemType";

export const CompletedTodos = ({
  styles,
  todos,
  deleteTodo,
}: {
  styles: any;
  todos: TodoItemType[];
  deleteTodo: (id: number) => Promise<void>;
}) => {
  const completedTasks = todos.filter((el) => el.status === "completed");
  return (
    <div className={styles.todos__list}>
      {completedTasks.length > 0 ? (
        todos.map(
          (el) =>
            el.status === "completed" && (
              <div className={styles.todos__item} key={el.todoId}>
                <h3 className={styles.todo__title}>{el.title}</h3>
                <p className={styles.todo__content}>{el.content}</p>
                <div className="btns">
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
        <h3 style={{ textAlign: "center" }}>
          You haven't finished anything yet. Let's get to work!
        </h3>
      )}
    </div>
  );
};
