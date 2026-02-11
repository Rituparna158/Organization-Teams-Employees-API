import pool from "../db/postgres";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";

const userService = {
  async register(email: string, password: string): Promise<User> {
    const passwordHash = await bcrypt.hash(password, 10);
    const sql = await pool.query(
      `INSERT INTO users (email,passwordHash)
            VALUES ($1, $2)
            RETURNING id,email,isActive,createdAt`,
      [email, passwordHash],
    );
    const newUser = sql.rows[0];
    await pool.query(
      `
                    INSERT INTO user_roles (userId,roleId)
                    SELECT $1,id FROM roles WHERE name='user'
                    ON CONFLICT DO NOTHING
                    `,
      [newUser.id],
    );
    return newUser;
  },
  async findByEmail(email: string): Promise<User | null> {
    const sql = await pool.query(
      `SELECT * FROM users WHERE email=$1 AND isActive=TRUE`,
      [email],
    );
    return sql.rows.length > 0 ? sql.rows[0] : null;
  },
  async updateMe(userId: number, email: string): Promise<User | null> {
    const sql = await pool.query(
      `
            UPDATE users SET email=$1 WHERE id=$2 AND isActive=TRUE
            RETURNING id, email, isActive, createdAt`,
      [email, userId],
    );
    return sql.rows.length > 0 ? sql.rows[0] : null;
  },
  async updatePassword(userId: number, newPassword: string): Promise<boolean> {
    const passwordHash = await bcrypt.hash(newPassword, 10);
    const sql = await pool.query(
      `
                UPDATE users SET passwordHash=$1 WHERE id=$2 AND isActive=TRUE`,
      [passwordHash, userId],
    );
    return (sql.rowCount ?? 0) > 0;
  },
  async deleteMe(userId: number): Promise<boolean> {
    const sql = await pool.query(
      `
                UPDATE users SET isActive=FALSE WHERE id=$1 AND isActive=TRUE`,
      [userId],
    );
    return (sql.rowCount ?? 0) > 0;
  },
};
export default userService;
