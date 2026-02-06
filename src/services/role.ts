import db from "../db/sqlite";
interface RoleRow {
  name: string;
}

const roleService = {
  getRoleByUser(userId: number): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT r.name FROM roles r
            INNER JOIN user_roles ur ON ur.roleId = r.id
            WHERE ur.userId=?`;

      db.all(sql, [userId], (err, rows: RoleRow[]) => {
        if (err) {
          reject(err);
          return;
        }
        const roles = rows.map((row) => row.name);
        resolve(roles);
      });
    });
  },

  assignRoleToUser(userId: number, roleName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const sql = `
            INSERT INTO user_roles (userId,roleId)
            SELECT ?,id
            FROM roles
            WHERE name=?`;
      db.run(sql, [userId, roleName], (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  },
  getAllRoles(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const sql = `
            SELECT name FROM roles`;

      db.all(sql, [], (err, rows: RoleRow[]) => {
        if (err) return reject(err);
        resolve(rows.map((r) => r.name));
      });
    });
  },
};
export default roleService;
