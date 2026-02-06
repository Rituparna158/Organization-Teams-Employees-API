import db from "../db/sqlite";
interface PermissionRow {
  name: string;
}
const permissionService = {
  getPermissionByRoles(roles: string[]): Promise<string[]> {
    return new Promise((resolve, reject) => {
      if (!roles || roles.length === 0) {
        return resolve([]);
      }
      const placeholders = roles.map(() => "?").join(",");

      const sql = `
            SELECT DISTINCT p.name
            FROM permissions p
            INNER JOIN role_permissions rp ON rp.permissionId=p.id
            INNER JOIN roles r ON r.id=rp.roleId
            WHERE r.name IN (${placeholders})`;

      db.all(sql, roles, (err, rows: PermissionRow[]) => {
        if (err) return reject(err);
        const permssions = rows.map((row) => row.name);
        resolve(permssions);
      });
    });
  },
  getAllPermissions(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT name FROM permissions`;

      db.all(sql, [], (err, rows: PermissionRow[]) => {
        if (err) return reject(err);
        resolve(rows.map((p) => p.name));
      });
    });
  },
  assignPermissionToRole(
    roleName: string,
    permissionName: string,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO role_permissions (roleId,permissionId)
            SELECT r.id, p.id
            FROM roles r, permissions p
            WHERE r.name=?
            AND p.name=?`;

      db.run(sql, [roleName, permissionName], function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  },
};
export default permissionService;
