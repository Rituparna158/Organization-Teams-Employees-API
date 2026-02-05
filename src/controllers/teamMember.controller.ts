import { Request,Response } from "express";
import TeamMemberService from "../services/teamMember.service";
import CONSTANTS from "../utils/constants";
const teamMemberController={
    async create(req:Request,res:Response){
        const teamId=Number(req.params.teamId);
        const {employeeId}=req.body;
        console.log("teamId",teamId);
        console.log("empId:",employeeId);
        const teamMember=await TeamMemberService.addMmber(teamId,employeeId);
        res.status(CONSTANTS.HTTP_STATUS.CREATED)
        .json({message:CONSTANTS.TEAM_MEMBER_MESSAGES.CREATED,
            data:teamMember
        });
    },
    async getMembers(req:Request,res:Response){
        const teamId=Number(req.params.teamId);
        const members=await TeamMemberService.getMmbersByTeam(teamId);
        if(members.length===0){
            return res.status(CONSTANTS.HTTP_STATUS.NOT_FOUND)
            .json({message:CONSTANTS.TEAM_MEMBER_MESSAGES.NOT_FOUND});
        }res.status(CONSTANTS.HTTP_STATUS.OK)
        .json(members);
    }
};
export default teamMemberController;