import { resolve } from "node:dns";
import pool from "../db/postgres";
import { Organization } from "../models/organization.model";
import { rejects } from "node:assert";

const organizationService = {
  async create(
    name: string,
    location: string,
    industry: string,
  ): Promise<Organization> {
    const sql = await pool.query(
      `INSERT INTO organizations 
                (name,location,industry) 
                VALUES ($1, $2, $3)
                RETURNING *`,
      [name, location, industry],
    );
    return sql.rows[0];
  },
  async getAll(): Promise<Organization[]> {
    const sql = await pool.query(`SELECT * FROM organizations 
                WHERE isActive = TRUE
                ORDER BY id ASC`);
    return sql.rows;
  },
  async getById(id: number): Promise<Organization | null> {
    const sql = await pool.query(
      `SELECT * FROM organizations 
                WHERE id=$1 AND isActive=TRUE`,
      [id],
    );
    return sql.rows.length > 0 ? sql.rows[0] : null;
  },
  async update(
    id: number,
    name: string,
    location: string,
    industry: string,
  ): Promise<Organization | null> {
    const sql = await pool.query(
      `UPDATE organizations
             SET name = $1,location = $2,industry= $3 ,
             updatedAt = CURRENT_TIMESTAMP WHERE id = $4 AND isActive=TRUE
             RETURNING *`,
      [name, location, industry, id],
    );
    return sql.rows.length > 0 ? sql.rows[0] : null;
  },
  async deleteAll(): Promise<number> {
    const sql = await pool.query(`UPDATE organizations 
            SET isActive=FALSE
            WHERE isActive=TRUE`);
    return sql.rowCount ?? 0;
  },
  async deleteById(id: number): Promise<boolean> {
    const sql = await pool.query(
      `UPDATE organizations
            SET isActive = FALSE
            WHERE id=$1 AND isActive=TRUE`,
      [id],
    );
    return (sql.rowCount ?? 0) > 0;
  },
};
export default organizationService;
