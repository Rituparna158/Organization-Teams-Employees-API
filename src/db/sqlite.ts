import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs";

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  console.log("Initializing database...");
  // Enable Foreign Keys
  db.run("PRAGMA foreign_keys = ON", (err) => {
    if (err) console.log("Foreign key enable failed");
    else console.log("Foreign keys enabled");
  });
  // USERS TABLE
  db.run(
    `
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      passwordHash TEXT NOT NULL,
      isActive INTEGER DEFAULT 1,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
    `,
    (err) => {
      if (err) console.log("users table error:", err.message);
      else console.log(" users table created");
    },
  );
  // ORGANIZATIONS TABLE
  db.run(
    `
    CREATE TABLE organizations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      location TEXT,
      industry TEXT,
      isActive INTEGER DEFAULT 1,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
    `,
    (err) => {
      if (err) console.log("organizations table error:", err.message);
      else console.log("organizations table created");
    },
  );
  // TEAMS TABLE
  db.run(
    `
    CREATE TABLE teams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      organizationId INTEGER NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (organizationId)
        REFERENCES organizations(id)
        ON DELETE CASCADE
    )
    `,
    (err) => {
      if (err) console.log("teams table error:", err.message);
      else console.log("teams table created");
    },
  );
  // EMPLOYEES TABLE
  db.run(
    `
    CREATE TABLE employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      designation TEXT,
      organizationId INTEGER NOT NULL,
      isActive INTEGER DEFAULT 1,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (organizationId)
        REFERENCES organizations(id)
        ON DELETE CASCADE
    )
    `,
    (err) => {
      if (err) console.log("employees table error:", err.message);
      else console.log("employees table created");
    },
  );
  // TEAM MEMBERS TABLE (Many-to-Many)
  db.run(
    `
    CREATE TABLE team_members (
      teamId INTEGER NOT NULL,
      employeeId INTEGER NOT NULL,
      joinedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (teamId, employeeId),
      FOREIGN KEY (teamId)
        REFERENCES teams(id)
        ON DELETE CASCADE,
      FOREIGN KEY (employeeId)
        REFERENCES employees(id)
        ON DELETE CASCADE
    )
    `,
    (err) => {
      if (err) console.log("team_members table error:", err.message);
      else console.log("team_members table created");
    },
  );
  // ROLES TABLE
  db.run(
    `
    CREATE TABLE roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    )
    `,
    (err) => {
      if (err) console.log("roles table error:", err.message);
      else console.log("roles table created");
    },
  );
  // PERMISSIONS TABLE
  db.run(
    `
    CREATE TABLE permissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    )
    `,
    (err) => {
      if (err) console.log("permissions table error:", err.message);
      else console.log("permissions table created");
    },
  );
  // USER_ROLES TABLE
  db.run(
    `
    CREATE TABLE user_roles (
      userId INTEGER NOT NULL,
      roleId INTEGER NOT NULL,
      PRIMARY KEY (userId, roleId),
      FOREIGN KEY (userId)
        REFERENCES users(id)
        ON DELETE CASCADE,
      FOREIGN KEY (roleId)
        REFERENCES roles(id)
        ON DELETE CASCADE
    )
    `,
    (err) => {
      if (err) console.log("user_roles table error:", err.message);
      else console.log("user_roles table created");
    },
  );
  // ROLE_PERMISSIONS TABLE
  db.run(
    `
    CREATE TABLE role_permissions (
      roleId INTEGER NOT NULL,
      permissionId INTEGER NOT NULL,
      PRIMARY KEY (roleId, permissionId),
      FOREIGN KEY (roleId)
        REFERENCES roles(id)
        ON DELETE CASCADE,
      FOREIGN KEY (permissionId)
        REFERENCES permissions(id)
        ON DELETE CASCADE
    )
    `,
    (err) => {
      if (err) console.log("role_permissions table error:", err.message);
      else console.log("role_permissions table created");
    },
  );
  // SEED ROLES
  db.run(`INSERT INTO roles (name) VALUES ('admin'), ('user')`, (err) => {
    if (err) console.log("roles seed error:", err.message);
    else console.log("roles seeded");
  });
  // SEED PERMISSIONS
  db.run(
    `
    INSERT INTO permissions (name) VALUES
    ('organization:create'),
    ('organization:read'),
    ('organization:update'),
    ('organization:delete'),
 
    ('team:create'),
    ('team:read'),
    ('team:update'),
    ('team:delete'),
    ('team:manage-members'),
 
    ('employee:create'),
    ('employee:read'),
    ('employee:update'),
    ('employee:delete'),
 
    ('user:assign-role')
    `,
    (err) => {
      if (err) console.log("permissions seed error:", err.message);
      else console.log("permissions seeded");
    },
  );

  // ADMIN ROLE - ALL PERMISSIONS
  db.run(
    `
    INSERT INTO role_permissions (roleId, permissionId)
    SELECT r.id, p.id
    FROM roles r, permissions p
    WHERE r.name='admin'
    `,
    (err) => {
      if (err) console.log("admin permission assign error:", err.message);
      else console.log("admin gets all permissions");
    },
  );

  // USER ROLE - ONLY READ PERMISSIONS
  db.run(
    `
    INSERT INTO role_permissions (roleId, permissionId)
    SELECT r.id, p.id
    FROM roles r
    JOIN permissions p
    WHERE r.name='user'
    AND p.name IN (
      'organization:read',
      'team:read',
      'employee:read'
    )
    `,
    (err) => {
      if (err) console.log("user permission assign error:", err.message);
      else console.log("user gets read-only permissions");
    },
  );

  // DEFAULT ADMIN USER SEED
  console.log("Creating default admin user...");

  bcrypt.hash("admin123", 10).then((hash) => {
    db.run(
      `INSERT INTO users (email, passwordHash) VALUES (?, ?)`,
      ["admin@test.com", hash],
      function (err) {
        if (err) {
          console.log("admin insert error:", err.message);
          return;
        }

        const adminId = this.lastID;

        db.run(
          `
          INSERT INTO user_roles (userId, roleId)
          SELECT ?, id FROM roles WHERE name='admin'
          `,
          [adminId],
          (err2) => {
            if (err2) console.log("admin role assign error:", err2.message);
            else {
              console.log("Default Admin Created!");
              console.log("Email: admin@test.com");
              console.log("Password: admin123");
            }
          },
        );
      },
    );
  });

  console.log("Database setup complete!");
});
export default db;
