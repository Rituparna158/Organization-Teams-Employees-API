import { Request, Response } from "express";
import teamService from "../services/team";
import CONSTANTS from "../utils/constants";

//const teams:Teams[]=[];

const teamController = {
  async create(req: Request, res: Response) {
    const { name, organizationId } = req.body;
    const team = await teamService.create(name, organizationId);
    res.status(CONSTANTS.HTTP_STATUS.CREATED).json(team);
  },
  async getAll(req: Request, res: Response) {
    const team = await teamService.getAll();
    res.status(CONSTANTS.HTTP_STATUS.OK).json(team);
  },
  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await teamService.getById(id);
    console.log("result:", result);
    if (!result) {
      return res
        .status(CONSTANTS.HTTP_STATUS.NOT_FOUND)
        .json({ message: CONSTANTS.TEAM_MESSAGES.NOT_FOUND });
    }

    res.status(CONSTANTS.HTTP_STATUS.OK).json(result);
  },
  async getOrganizationId(req: Request, res: Response) {
    const orgId = Number(req.params.orgId);
    const result = await teamService.getById(orgId);
    res.status(CONSTANTS.HTTP_STATUS.OK).json(result);
  },
  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { name } = req.body;
    const teams = await teamService.update(id, name);
    if (!teams) {
      return res
        .status(CONSTANTS.HTTP_STATUS.NOT_FOUND)
        .json({ message: CONSTANTS.ORGANIZATION_MESSAGES.NOT_FOUND });
    }
    res.status(CONSTANTS.HTTP_STATUS.OK).json(teams);
  },
  async deleteById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const deleted = await teamService.deleteById(id);
    if (!deleted) {
      return res
        .status(CONSTANTS.HTTP_STATUS.NOT_FOUND)
        .json({ message: CONSTANTS.TEAM_MESSAGES.NOT_FOUND });
    }
    res
      .status(CONSTANTS.HTTP_STATUS.OK)
      .json({ message: CONSTANTS.TEAM_MESSAGES.DELETED });
  },
  async deleteAll(req: Request, res: Response) {
    const count = await teamService.deleteAll();

    res.status(CONSTANTS.HTTP_STATUS.OK).json({
      message: CONSTANTS.TEAM_MESSAGES.ALL_DELETED,
      deletedCount: count,
    });
  },
  /*update(req:Request,res:Response){
        const orgId=Number(req.params.orgId);
        const teamName=req.body.name;
        const team=teams.find(t=>t.organizationId=== orgId)
        if(!team){
            return res.status(404).json({message:"Team not found"});
        }
        team.name=teamName;
        res.json(team)
    }*/
};
export default teamController;
