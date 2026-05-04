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
  return (
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
  );
};
