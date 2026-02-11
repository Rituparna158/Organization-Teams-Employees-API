import pool from "../db/postgres";
interface PermissionRow {
  name: string;
}
const permissionService = {
  async getPermissionByRoles(roles: string[]): Promise<string[]> {
    if (!roles || roles.length === 0) {
      return [];
    }
    const sql = await pool.query(
      `
            SELECT DISTINCT p.name
            FROM permissions p
            JOIN role_permissions rp ON rp.permissionId=p.id
            JOIN roles r ON r.id=rp.roleId
            WHERE r.name=ANY($1)`,
      [roles],
    );
    return sql.rows.map((p) => p.name);
  },
  async getAllPermissions(): Promise<string[]> {
    const sql = await pool.query(`SELECT name FROM permissions`);
    return sql.rows;
  },
  async assignPermissionToRole(
    roleName: string,
    permissionName: string,
  ): Promise<void> {
    const sql = await pool.query(
      `INSERT INTO role_permissions (roleId,permissionId)
            SELECT r.id, p.id
            FROM roles r, permissions p
            WHERE r.name=$1
            AND p.name=$2
            ON CONFLICT DO NOTHING`,
      [roleName, permissionName],
    );
  },
};
export default permissionService;
