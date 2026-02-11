import pool from "../db/postgres";
import { Employee } from "../models/employee.model";

const employeeeService = {
  async create(
    name: string,
    email: string,
    phone: number,
    designation: string | null,
    oganizationId: number,
  ): Promise<Employee> {
    const sql = await pool.query(
      `INSERT INTO employees (name,email,phone,designation,organizationId)
             VALUES ($1, $2, $3, $4,$5) RETURNING *`,
      [name, email, phone, designation, oganizationId],
    );
    return sql.rows[0];
  },
  async getById(id: number): Promise<Employee | null> {
    const sql = await pool.query(
      `SELECT * FROM employees WHERE id=$1 AND isActive=TRUE`,
      [id],
    );
    return sql.rows.length > 0 ? sql.rows[0] : null;
  },
  async getAll(): Promise<Employee[]> {
    const sql = await pool.query(
      `SELECT * FROM employees WHERE isActive=TRUE
                ORDER BY id ASC`,
    );
    return sql.rows;
  },
  async getAllByOrganization(organizationId: number): Promise<Employee[]> {
    const sql = await pool.query(
      `SELECT * FROM employees
                 WHERE organizationId=$1 AND isActive=TRUE
                  ORDER BY id ASC`,
      [organizationId],
    );
    return sql.rows;
  },
  async update(
    id: number,
    phone: string | null,
    designation: string | null,
  ): Promise<Employee | null> {
    const sql = await pool.query(
      `UPDATE employees
            SET phone=$1,designation=$2,updatedAt=CURRENT_TIMESTAMP
            WHERE id=$3 AND isActive=TRUE
            RETURNING *`,
      [phone, designation, id],
    );
    return sql.rows.length > 0 ? sql.rows[0] : null;
  },
  async deleteById(id: number): Promise<boolean> {
    const sql = await pool.query(
      `
            UPDATE employees SET isActive=FALSE WHERE id=$1 AND isActive=TRUE`,
      [id],
    );
    return (sql.rowCount ?? 0) > 0;
  },
  async deleteAll(): Promise<number> {
    const sql = await pool.query(`UPDATE employees
            SET isActive=FALSE
            WHERE isActive=TRUE`);
    return sql.rowCount || 0;
  },
};
export default employeeeService;
