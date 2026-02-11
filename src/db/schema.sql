CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL,

    isActive BOOLEAN DEFAULT TRUE,

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS organizations(
    id SERIAL PRIMARY KEY,

    name TEXT NOT NULL,
    location TEXT,
    industry TEXT,

    isActive BOOLEAN DEFAULT TRUE,

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE IF NOT EXISTS teams(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    organizationId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (organizationId)
        REFERENCES organizations(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS employees(
    id SERIAL PRIMARY KEY,

    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,

    phone TEXT,
    designation TEXT,

    organizationId INT NOT NULL,

    isActive BOOLEAN DEFAULT TRUE,

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (organizationId)
        REFERENCES organizationId(id)
        ON DELETE CASCADE
);

CREATE TABLE IF  NOT EXISTS team_members(
    teamId INT NOT NULL,
    employeeId INT NOT NULL,

    joinedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY key(teamId,employeeId)

    FOREIGN KEY(teamId)
        REFERENCES teams(id)
        ON DELETE CASCADE

    FOREIGN KEY(employeeId)
        REFERENCES employees(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_roles(
    userId INT NOT NULL,
    roleId INT NOT NULL,

    PRIMARY KEY(userId,roleId)

    FOREIGN KEY(userId)
        REFERENCES users(id)
        ON DELETE CASCADE
    FOREIGN KEY(roleId)
        REFERENCES roles(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS role_permissions (
      roleId INTEGER NOT NULL,
      permissionId INTEGER NOT NULL,

      PRIMARY KEY (roleId, permissionId),

      FOREIGN KEY (roleId)
        REFERENCES roles(id)
        ON DELETE CASCADE,
      FOREIGN KEY (permissionId)
        REFERENCES permissions(id)
        ON DELETE CASCADE
) ;

INSERT OR IGNORE INTO roles (name) VALUES ('admin'), ('user') ON CONFLICT DO NOTHING;

INSERT OR IGNORE INTO permissions (name) VALUES
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
    ON CONFLICT DO NOTHING;

INSERT OR IGNORE INTO role_permissions (roleId, permissionId)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name='admin'
ON CONFLICT DO NOTHING;

INSERT OR IGNORE INTO role_permissions (roleId, permissionId)
SELECT r.id, p.id
FROM roles r
JOIN permissions p
WHERE r.name='user'
ON p.name IN (
    'organization:read',
    'team:read',
    'employee:read'
)
WHERE r.name = 'user'
ON CONFLICT DO NOTHING

INSERT OR IGNORE INTO users(email,passwordHash)
VALUES(
    'admin@test.com',
    'admin123'
)
ON CONFLICT DO NOTHING;

INSERT OR IGNORE INTO user_roles(userId,roleId)
SELECT u.id, r.idFROM users u, roles r
WHERE u.email='admin@test.com'
AND r.name='admin'
ON CONFLICT DO NOTHING



