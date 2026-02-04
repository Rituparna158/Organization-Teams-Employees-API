import  sqlite3  from "sqlite3";
const db=new sqlite3.Database(":memory:");

db.serialize(()=>{
    //db.run("PRAGMA foreign_keys = ON")
    db.run(
        `CREATE TABLE users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        passwordHash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        isActive INTEGER NOT NULL DEFAULT 1,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP  
        )`);

    db.run(
        `CREATE TABLE refresh_tokens(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        token TEXT NOT NULL,
        expiresAt TEXT NOT NULL,
        isRevoked INTEGER DEFAULT 0,
        FOREIGN KEY (userId)
            REFERENCES users(id)
            ON DELETE CASCADE    
        )`);
    
    db.run(
        `CREATE TABLE organizations(
        id INTEGER PRIMARY KEY AUTOINCREMENT ,
        name TEXT NOT NULL,
        location TEXT ,
        industry TEXT,
        isActive INTEGER DEFAULT 1,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
        )`
    );
    db.run(
        `CREATE TABLE teams(
        id INTEGER PRIMARY KEY AUTOINCREMENT ,
        name TEXT NOT NULL,
        organizationId INTEGER NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (organizationId)
        REFERENCES organizations (id)
        ON DELETE CASCADE 
        )`
    );
    db.run(
        `CREATE TABLE employees(
        id INTEGER PRIMARY KEY AUTOINCREMENT ,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT,
        designation TEXT,
        organizationId INTEGER NOT NULL,
        isActive INTEGER DEFAULT 1,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (organizationId)
        REFERENCES organizations (id)
        ON DELETE CASCADE 
        )`);
    db.run(
        `CREATE TABLE team_members(
        teamId INTEGER NOT NULL,
        employeeId INTEGER NOT NULL,
        joinedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(teamId,employeeId),
        FOREIGN KEY(teamId)
            REFERENCES teams(id)
            ON DELETE CASCADE,
        FOREIGN KEY(employeeId)
            REFERENCES employees(id)
            ON DELETE CASCADE
                
        )`);
})
export default db;