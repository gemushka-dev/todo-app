import type { TodoItemType } from "../types/TodoItemType";

export const ActiveTodos = ({
  styles,
  todos,
  updateTodoStatus,
  deleteTodo,
}: {
  styles: any;
  todos: TodoItemType[];
  updateTodoStatus: (id: number, status: string) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}) => {
  const activeTasks = todos.filter((el) => el.status === "pending");

  return (
    <div className={styles.todos__list}>
      {activeTasks.length > 0 ? (
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
        <h3 style={{ textAlign: "center" }}>Relax. All tasks done.</h3>
      )}
    </div>
  );
};
