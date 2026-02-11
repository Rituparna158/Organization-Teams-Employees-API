import { resolve } from "node:dns";
import pool from "../db/postgres";
import { Teams } from "../models/teams.model";

const teamService = {
  async create(name: string, organizationId: number): Promise<Teams> {
    const sql = await pool.query(
      `INSERT INTO teams (name , organizationId) 
                VALUES ($1,$2)`,
      [name, organizationId],
    );
    return sql.rows[0];
  },
  async getAll(): Promise<Teams[]> {
    const sql = await pool.query(`SELECT * FROM teams ORDER BY id ASC`);
    return sql.rows;
  },
  async getById(id: number): Promise<Teams | null> {
    const sql = await pool.query(`SELECT * FROM teams WHERE id=?$1`, [id]);
    return sql.rows.length > 0 ? sql.rows[0] : null;
  },
  async getByOrganizationId(organizationId: number): Promise<Teams[]> {
    const sql = await pool.query(
      `SELECT * FROM teams 
            WHERE organizationId=$1 ORDER BY id ASC`,
      [organizationId],
    );
    return sql.rows;
  },
  async update(id: number, name: string): Promise<Teams | null> {
    const sql = await pool.query(
      `UPDATE teams SET name=$1 WHERE id=$2 RETURNING *`,
      [name, id],
    );
    return sql.rows.length > 0 ? sql.rows[0] : null;
  },
  async deleteById(id: number): Promise<boolean> {
    const sql = await pool.query(`DELETE FROM teams WHERE id=?`[id]);
    return (sql.rowCount ?? 0) > 0;
  },
  async deleteAll(): Promise<number> {
    const sql = await pool.query(`DELETE FROM teams`);
    return sql.rowCount ?? 0;
  },
};
export default teamService;
