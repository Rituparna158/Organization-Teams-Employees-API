import { resolve } from "node:dns";
import db from "../db/sqlite";
import { Organization } from "../models/organization.model";
import { rejects } from "node:assert";

const organizationService = {
  create(
    name: string,
    location: string,
    industry: string,
  ): Promise<Organization> {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO organizations (name,location,industry) VALUES (?, ?, ?)";
      db.run(sql, [name, location, industry], function (err) {
        if (err) {
          reject(err);
        } else {
          db.get(
            `SELECT * FROM organizations WHERE id=?`,
            [this.lastID],
            (err2, row) => {
              if (err2) reject(err2);
              else resolve(row as Organization);
            },
          );
        }
      });
    });
  },
  getAll(): Promise<Organization[]> {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM organizations WHERE isActive = 1";
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as Organization[]);
        }
      });
    });
  },
  getById(id: number): Promise<Organization | null> {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM organizations WHERE id=? AND isActive=1";

      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row ? (row as Organization) : null);
        }
      });
    });
  },
  update(
    id: number,
    name: string,
    location: string,
    industry: string,
  ): Promise<Organization | null> {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE organizations
             SET name = ?,location = ?,industry= ? ,
             updatedAt = CURRENT_TIMESTAMP WHERE id = ? AND isActive=1`;

      db.run(sql, [name, location, industry, id], function (err) {
        if (err) {
          reject(err);
        } else {
          db.get(
            `SELECT * FROM organizations WHERE id=?`,
            [id],
            (err2, row) => {
              if (err2) reject(err2);
              else resolve(row as Organization);
            },
          );
        }
      });
    });
  },
  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE organizations 
            SET isActive=0
            WHERE isActive=1`;

      db.run(sql, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  },
  deleteById(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE organizations
            SET isActive = 0
            WHERE id=? AND isActive=1`;

      db.run(sql, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  },
};
export default organizationService;
