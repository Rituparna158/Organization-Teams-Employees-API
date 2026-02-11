import { Request, Response } from "express";
import TeamMemberService from "../services/teamMember.service";
import CONSTANTS from "../utils/constants";
const teamMemberController = {
  async create(req: Request, res: Response) {
    try {
      const teamId = Number(req.params.teamId);
      const { employeeId } = req.body;
      if (!employeeId) {
        return res
          .status(CONSTANTS.HTTP_STATUS.BAD_REQUEST)
          .json({ message: "EmployeeId is required" });
      }
      console.log("teamId", teamId);
      console.log("empId:", employeeId);
      const teamMember = await TeamMemberService.addMmber(teamId, employeeId);
      res
        .status(CONSTANTS.HTTP_STATUS.CREATED)
        .json({
          message: CONSTANTS.TEAM_MEMBER_MESSAGES.CREATED,
          data: teamMember,
        });
    } catch (error) {
      return res
        .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: CONSTANTS.AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  },
  async getMembers(req: Request, res: Response) {
    try {
      const teamId = Number(req.params.teamId);
      const members = await TeamMemberService.getMmbersByTeam(teamId);
      if (members.length === 0) {
        return res
          .status(CONSTANTS.HTTP_STATUS.NOT_FOUND)
          .json({ message: CONSTANTS.TEAM_MEMBER_MESSAGES.NOT_FOUND });
      }
      res.status(CONSTANTS.HTTP_STATUS.OK).json(members);
    } catch (error) {
      return res
        .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: CONSTANTS.AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  },
};
export default teamMemberController;
