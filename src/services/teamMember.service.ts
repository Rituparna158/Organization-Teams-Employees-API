import pool from "../db/postgres";
import { TeamMember } from "../models/teamMember.model";

const TeamMemberService = {
  async addMmber(teamId: number, employeeId: number): Promise<TeamMember> {
    const sql = await pool.query(
      `INSERT INTO team_members(teamId,employeeId)
                 VALUES($1, $2)
                 ON CONFLICT DO NOTHING 
                 RETURNING  *`,
      [teamId, employeeId],
    );
    return sql.rows[0];
  },
  async getMmbersByTeam(teamId: number): Promise<TeamMember[]> {
    const sql = await pool.query(
      `SELECT e.*  FROM employees e
                JOIN team_members tm ON tm.employeeId=e.id
                WHERE tm.teamId = $1`,
      [teamId],
    );
    return sql.rows;
  },
};
export default TeamMemberService;
