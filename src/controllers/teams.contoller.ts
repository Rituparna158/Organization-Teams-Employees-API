import { Request, Response } from "express";
import teamService from "../services/team.service";
import CONSTANTS from "../utils/constants";

//const teams:Teams[]=[];

const teamController = {
  async create(req: Request, res: Response) {
    try {
      const { name, organizationId } = req.body;
      if (!name || !organizationId) {
        return res
          .status(CONSTANTS.HTTP_STATUS.BAD_REQUEST)
          .json({ message: "Team name and organizationId is required" });
      }
      const team = await teamService.create(name, organizationId);
      res
        .status(CONSTANTS.HTTP_STATUS.CREATED)
        .json({ message: CONSTANTS.TEAM_MEMBER_MESSAGES.CREATED, data: team });
    } catch {
      return res
        .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: CONSTANTS.AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const team = await teamService.getAll();
      res.status(CONSTANTS.HTTP_STATUS.OK).json(team);
    } catch {
      return res
        .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: CONSTANTS.AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await teamService.getById(id);
      console.log("result:", result);
      if (!result) {
        return res
          .status(CONSTANTS.HTTP_STATUS.NOT_FOUND)
          .json({ message: CONSTANTS.TEAM_MESSAGES.NOT_FOUND });
      }
      res.status(CONSTANTS.HTTP_STATUS.OK).json(result);
    } catch {
      return res
        .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: CONSTANTS.AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  },

  async getOrganizationId(req: Request, res: Response) {
    try {
      const orgId = Number(req.params.orgId);
      const result = await teamService.getByOrganizationId(orgId);
      res.status(CONSTANTS.HTTP_STATUS.OK).json(result);
    } catch {
      return res
        .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: CONSTANTS.AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { name } = req.body;
      const teams = await teamService.update(id, name);
      if (!teams) {
        return res
          .status(CONSTANTS.HTTP_STATUS.NOT_FOUND)
          .json({ message: CONSTANTS.ORGANIZATION_MESSAGES.NOT_FOUND });
      }
      res.status(CONSTANTS.HTTP_STATUS.OK).json(teams);
    } catch {
      return res
        .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: CONSTANTS.AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  },
  async deleteById(req: Request, res: Response) {
    try {
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
    } catch {
      return res
        .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: CONSTANTS.AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  },
  async deleteAll(req: Request, res: Response) {
    try {
      const count = await teamService.deleteAll();
      res.status(CONSTANTS.HTTP_STATUS.OK).json({
        message: CONSTANTS.TEAM_MESSAGES.ALL_DELETED,
        deletedCount: count,
      });
    } catch {
      return res
        .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: CONSTANTS.AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  },
};
export default teamController;
