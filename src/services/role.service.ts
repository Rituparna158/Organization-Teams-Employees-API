import pool from "../db/postgres";
interface RoleRow {
  name: string;
}

const roleService = {
  async getRoleByUser(userId: number): Promise<string[]> {
    const sql = await pool.query(
      `SELECT r.name FROM roles r
            JOIN user_roles ur ON ur.roleId = r.id
            WHERE ur.userId=$1`,
      [userId],
    );
    return sql.rows.map((r) => r.name);
  },

  async assignRoleToUser(userId: number, roleName: string): Promise<void> {
    const sql = await pool.query(
      `
            INSERT INTO user_roles (userId,roleId)
            SELECT $1,id
            FROM roles
            WHERE name=$2
            ON CONFLICT DO NOTHING`,
      [userId, roleName],
    );
  },
  async getAllRoles(): Promise<string[]> {
    const sql = await pool.query(`SELECT name FROM roles`);
    return sql.rows;
  },
};
export default roleService;
