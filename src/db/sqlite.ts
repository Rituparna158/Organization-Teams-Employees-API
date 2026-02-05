import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs";
 
const db = new sqlite3.Database(":memory:");
 
db.serialize(() => {
  console.log("Initializing database...");
 
  db.run(`PRAGMA foreign_keys = ON`);
 
  
  // USERS TABLE

  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      passwordHash TEXT NOT NULL,
      isActive INTEGER NOT NULL DEFAULT 1,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
 
  
  // ORGANIZATIONS TABLE
  
  db.run(`
    CREATE TABLE organizations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      location TEXT,
      industry TEXT,
      isActive INTEGER DEFAULT 1,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
 

  // TEAMS TABLE
 
  db.run(`
    CREATE TABLE teams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      organizationId INTEGER NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (organizationId)
        REFERENCES organizations(id)
        ON DELETE CASCADE
    )
  `);

  // EMPLOYEES TABLE
  
  db.run(`
    CREATE TABLE employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
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
  `);
 
 
  // TEAM MEMBERS TABLE
  
  db.run(`
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
  `);
 

  // ROLES TABLE
 
  db.run(`
    CREATE TABLE roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )
  `);
 
  
  // PERMISSIONS TABLE

  db.run(`
    CREATE TABLE permissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )
  `);

  // USER_ROLES TABLE
 
  db.run(`
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
  `);
 
  
  // ROLE_PERMISSIONS TABLE

  db.run(`
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
  `);
 
  
  // SEED ROLES
 
  db.run(`
    INSERT INTO roles (name)
    VALUES ('admin'), ('user')
  `);
 
  // SEED PERMISSIONS

  db.run(`
    INSERT INTO permissions (name)
    VALUES
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
  `);
 

  // ADMIN ROLE GETS ALL PERMISSIONS
  
  db.run(`
    INSERT INTO role_permissions (roleId, permissionId)
    SELECT r.id, p.id
    FROM roles r, permissions p
    WHERE r.name = 'admin'
  `);
 
 
  // USER ROLE GETS ONLY READ PERMISSIONS
 
  db.run(`
    INSERT INTO role_permissions (roleId, permissionId)
    SELECT r.id, p.id
    FROM roles r
    JOIN permissions p
    WHERE r.name = 'user'
      AND p.name IN (
        'organization:read',
        'team:read',
        'employee:read'
      )
  `);

  const seedAdmin=async()=>{
    const email="admin@test.com";
    const password="admin123";

    const hash=await bcrypt.hash(password,10);
    db.run(
      `INSERT INTO users (email,passwordhash) VALUES (?, ?)`,
      [email,hash],
      function(){
        const adminId=this.lastID;
        db.run(
          `INSERT INTO user_roles (userId,roleId)
          SELECT ?,id FROM roles WHERE name='admin'`,
          [adminId]
        );
        console.log("Default admin created");
        console.log("email:",email);
        console.log("password:",password);
      }
    )
  };
  seedAdmin();
 
  console.log("Database initialized successfully with RBAC");
});
 
export default db;
 