import { Request, Response } from "express";
import employeeeService from "../services/employee";
import CONSTANTS from "../utils/constants";

//const organizations:Organization[]=[];

const employeeController = {
  async create(req: Request, res: Response) {
    const { name, email, phone, designation, organizationId } = req.body;
    const emp = await employeeeService.create(
      name,
      email,
      phone,
      designation ?? null,
      organizationId,
    );
    res.status(CONSTANTS.HTTP_STATUS.CREATED).json(emp);
  },
  async getAll(req: Request, res: Response) {
    const emp = await employeeeService.getAll();
    res.status(CONSTANTS.HTTP_STATUS.OK).json(emp);
  },
  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const org = await employeeeService.getById(id);
    if (!org) {
      return res.status(CONSTANTS.HTTP_STATUS.NOT_FOUND).json({
        message: CONSTANTS.EMPLOYEE_MESSAGES.NOT_FOUND,
      });
    }
    res.status(CONSTANTS.HTTP_STATUS.OK).json(org);
  },
  async getAllByOrganization(req: Request, res: Response) {
    const organizationId = Number(req.params.organizationId);
    const emp = await employeeeService.getAllByOrganization(organizationId);
    res.status(CONSTANTS.HTTP_STATUS.OK).json(emp);
  },
  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { phone, designation } = req.body;
    const emp = await employeeeService.update(id, phone, designation);
    if (!emp) {
      return res
        .status(CONSTANTS.HTTP_STATUS.NOT_FOUND)
        .json({ message: CONSTANTS.EMPLOYEE_MESSAGES.NOT_FOUND });
    }
    res.status(CONSTANTS.HTTP_STATUS.OK).json(emp);
  },
  async deleteAll(req: Request, res: Response) {
    const count = await employeeeService.deleteAll();

    res.status(CONSTANTS.HTTP_STATUS.OK).json({
      message: CONSTANTS.EMPLOYEE_MESSAGES.ALL_DELETED,
      deletedCount: count,
    });
  },
  async deleteById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const index = await employeeeService.deleteById(id);
    if (!index) {
      return res
        .status(CONSTANTS.HTTP_STATUS.NOT_FOUND)
        .json({ message: CONSTANTS.EMPLOYEE_MESSAGES.NOT_FOUND });
    }
    res.json({ message: CONSTANTS.EMPLOYEE_MESSAGES.DELETED });
  },
};
export default employeeController;
