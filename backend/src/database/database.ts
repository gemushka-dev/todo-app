import { pool } from "./pool";
import { UserDB } from "../types/users.server";
import { ClientUserDTO } from "../types/users.client";
import { TodoDB, TodoStatus } from "../types/todos.server";
import { TodosDTO } from "../types/todos.client";

class Database {
  async init() {
    const userQuery = `
        CREATE TABLE IF NOT EXISTS users(
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(64) NOT NULL,
            user_email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );
    `;
    const todosQuery = `
        CREATE TABLE IF NOT EXISTS todos( 
            todo_id SERIAL PRIMARY KEY, 
            title VARCHAR(64) NOT NULL, 
            content TEXT, 
            user_id INT NOT NULL, 
            status VARCHAR(16) DEFAULT 'pending' CHECK(status IN ('pending', 'completed')), 
            created_at TIMESTAMP DEFAULT NOW(), 
            
            CONSTRAINT fk_user_id FOREIGN KEY(user_id) 
            REFERENCES users(user_id) ON DELETE CASCADE 
      );
    `;
    const indexQuery = `
        CREATE INDEX IF NOT EXISTS idx_todos_user_id_created_at 
        ON todos(user_id, created_at DESC);
    `;

    await pool.query(userQuery);
    await pool.query(todosQuery);
    await pool.query(indexQuery);
  }

  async getUserById(userId: number): Promise<UserDB | null> {
    const query = `
    SELECT * FROM users WHERE user_id = $1
    `;
    const data = await pool.query(query, [userId]);
    return data.rows[0] || null;
  }
  async getUserByEmail(email: string): Promise<UserDB | null> {
    const query = `
      SELECT * FROM users WHERE user_email = $1
    `;
    const data = await pool.query(query, [email]);
    return data.rows[0] || null;
  }

  async createUser(user: ClientUserDTO): Promise<UserDB> {
    const query = `
      INSERT INTO users(username, user_email , password) 
      VALUES($1, $2, $3) 
      RETURNING *
    `;
    const data = await pool.query(query, [
      user.username,
      user.userEmail,
      user.password,
    ]);
    return data.rows[0];
  }

  async getTodosByUserId(userId: number): Promise<TodoDB[]> {
    const query = `
      SELECT * FROM todos WHERE  user_id = $1
      ORDER BY created_at DESC
    `;
    const data = await pool.query(query, [userId]);
    return data.rows;
  }

  async getTodoById(todoId: number, userId: number): Promise<TodoDB | null> {
    const query = `
      SELECT * FROM todos WHERE  todo_id = $1 AND user_id = $2
    `;
    const data = await pool.query(query, [todoId, userId]);
    return data.rows[0] || null;
  }

  async createTodo(todos: TodosDTO): Promise<TodoDB> {
    const query = `
      INSERT INTO todos(title,content , user_id) 
      VALUES($1, $2, $3) 
      RETURNING *
    `;
    const data = await pool.query(query, [
      todos.title,
      todos.content,
      todos.userId,
    ]);
    return data.rows[0];
  }

  async updateTodoStatus(
    todoId: number,
    userId: number,
    status: TodoStatus,
  ): Promise<TodoDB | null> {
    const query = `
      UPDATE todos SET status = $1
      WHERE user_id = $2 AND todo_id = $3
      RETURNING *
    `;
    const data = await pool.query(query, [status, userId, todoId]);
    return data.rows[0] || null;
  }

  async deleteTodo(userId: number, todoId: number): Promise<boolean> {
    const query = `DELETE FROM todos WHERE user_id = $1 AND todo_id = $2`;
    const result = await pool.query(query, [userId, todoId]);
    return result.rowCount ? true : false;
  }
}

export const db = new Database();
