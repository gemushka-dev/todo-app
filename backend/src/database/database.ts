import { pool } from "./pool";
import { UserDB, UserResponse } from "../types/users.server";
import { ClientUserDTO } from "../types/users.client";

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
    await pool.query(userQuery);
  }

  async getUserById(userId: number): Promise<UserResponse | null> {
    const query = `
    SELECT user_id AS userId, username, 
    user_email AS userEmail, created_at AS createdAt
    FROM users WHERE user_id = $1
    `;
    const data = await pool.query(query, [userId]);
    return data.rows[0];
  }
  async getUserByEmail(email: string): Promise<UserDB | null> {
    const query = `
      SELECT user_id AS userId, username, 
      user_email AS userEmail, password,
      created_at AS createdAt
      FROM users WHERE user_email = $1
    `;
    const data = await pool.query(query, [email]);
    return data.rows[0];
  }

  async createUser(user: ClientUserDTO): Promise<UserResponse | null> {
    const query = `
      INSERT INTO users(username, user_email , password) 
      VALUES($1, $2, $3) 
      RETURNING user_id AS userId, username, 
      user_email AS userEmail, created_at AS createdAt
    `;
    const data = await pool.query(query, [
      user.username,
      user.userEmail,
      user.password,
    ]);
    return data.rows[0];
  }
}

export const db = new Database();
