const constants = {
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
  },
  ORGANIZATION_MESSAGES: {
    NOT_FOUND: "Organization not Found",
    CREATED: "Organization created",
    UPDATED: "Organization updated",
    DELETED: "Organization deleted",
    ALL_DELETED: "All organizations deleted",
  },
  TEAM_MESSAGES: {
    NOT_FOUND: "Team not Found",
    CREATED: "Team created",
    UPDATED: "Team updated",
    DELETED: "Team deleted",
    ALL_DELETED: "All Teams deleted",
  },
  EMPLOYEE_MESSAGES: {
    NOT_FOUND: "Employee not Found",
    CREATED: "Employee created",
    UPDATED: "Employee updated",
    DELETED: "Employee deleted",
    ALL_DELETED: "All Employees are deleted",
  },
  TEAM_MEMBER_MESSAGES: {
    NOT_FOUND: "No members found for this team",
    CREATED: "Employee added to team successfully",
    BAD_REQUEST: "TeamId or employee id is missing",
    //UPDATED:"Employee updated",
    //DELETED:"Employee deleted",
    //ALL_DELETED:"All Employees are deleted"
  },
  AUTH_MESSAGES: {
    INVALID_CREDENTIALS: "Ivalid email or password",
    USER_CREATED: "User registered successfully",
    LOGIN_SUCCESS: "Login successful",
    TOKEN_MISSING: "Authorization token missing",
    TOKEN_INVALID: "Invalid or expired token",
    LOGOUT_SUCCESS: "Logged out successfully",
  },
};
export default constants;
