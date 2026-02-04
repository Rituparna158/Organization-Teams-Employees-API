import db from "../db/sqlite";
import { TeamMember } from "../models/teamMember.model";

const TeamMemberService={
    addMmber(
        teamId:number,
        employeeId:number
    ):Promise<TeamMember>{
        return new Promise((resolve,reject)=>{
            const sql=`INSERT INTO team_members(teamId,employeeId) VALUES(?, ?)`;
            db.run(sql,[teamId,employeeId],(err)=>{
                if(err) reject(err);
                else{
                    db.get(
                        `SELECT * FROM team_members WHERE teamId=? AND employeeId=?`,
                        [teamId,employeeId],
                        (err2,row)=>{
                            if(err2) reject(err2);
                            else resolve(row as TeamMember);
                        }
                    )
                }
            })
        })
    },
    getMmbersByTeam(
        teamId:number
    ):Promise<TeamMember[]>{
        return new Promise((resolve,reject)=>{
            const sql=
            `SELECT * FROM team_members WHERE teamId=?`;
            db.all(sql,[teamId],(err,rows)=>{
                if(err) reject(err);
                else resolve(rows as TeamMember[]);
            })
        })
    }
}
export default TeamMemberService;