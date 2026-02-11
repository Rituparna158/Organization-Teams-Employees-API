import { Request, Response } from "express";
import organizationService from "../services/organization.service";
import CONSTANTS from "../utils/constants";

//const organizations:Organization[]=[];

const organizationController = {
  async create(req: Request, res: Response) {
    try {
      const { name, location, industry } = req.body;
      const org = await organizationService.create(name, location, industry);
      res.status(CONSTANTS.HTTP_STATUS.CREATED).json(org);
    } catch {
      return res
        .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: CONSTANTS.AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const org = await organizationService.getAll();
      res.status(CONSTANTS.HTTP_STATUS.OK).json(org);
    } catch {
      return res
        .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: CONSTANTS.AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const org = await organizationService.getById(id);
      if (!org) {
        return res.status(CONSTANTS.HTTP_STATUS.NOT_FOUND).json({
          message: CONSTANTS.ORGANIZATION_MESSAGES.NOT_FOUND,
        });
      }
      res.status(CONSTANTS.HTTP_STATUS.OK).json(org);
    } catch {
      return res
        .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: CONSTANTS.AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  },

  async update(req: Request, res: Response) {
    try {
      console.log("update hit", req.params.id, req.body);
      const id = Number(req.params.id);
      const { name, location, industry } = req.body;
      const org = await organizationService.update(
        id,
        name,
        location,
        industry,
      );
      if (!org) {
        return res
          .status(CONSTANTS.HTTP_STATUS.NOT_FOUND)
          .json({ message: CONSTANTS.ORGANIZATION_MESSAGES.NOT_FOUND });
      }
      res.status(CONSTANTS.HTTP_STATUS.OK).json(org);
    } catch {
      return res
        .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: CONSTANTS.AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  },

  async deleteAll(req: Request, res: Response) {
    try {
      const count = await organizationService.deleteAll();

      res.status(CONSTANTS.HTTP_STATUS.OK).json({
        message: CONSTANTS.ORGANIZATION_MESSAGES.ALL_DELETED,
        deletedCount: count,
      });
    } catch {
      return res
        .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: CONSTANTS.AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  },

  async deleteById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const index = await organizationService.deleteById(id);
      if (!index) {
        return res
          .status(CONSTANTS.HTTP_STATUS.NOT_FOUND)
          .json({ message: CONSTANTS.ORGANIZATION_MESSAGES.NOT_FOUND });
      }
      res.json({ message: "Organisation deleted successfully" });
    } catch {
      return res
        .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: CONSTANTS.AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  },
};
export default organizationController;
