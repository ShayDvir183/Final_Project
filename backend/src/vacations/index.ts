import express, { Request, Response, NextFunction } from "express";
import {
  createVacation,
  deleteVacation,
  editVacation,
  followVacation,
  getAllVacations,
} from "./businessLogic";
import { getChartData } from "./chart";

const router = express.Router();

router.get("/", allVacationsHandler);
router.get("/chart", chartDataHandler);
router.post("/", createVacationHandler);
router.post("/follow", followVacationHandler);
router.delete("/:id", deleteVacationHandler);
router.post("/edit", editVacationHandler);

async function allVacationsHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  try {
    const result = await getAllVacations(req.userData.id);
    res.json({ message: "All Vacations", vacations: result });
  } catch (error) {
    next(error);
  }
}
async function chartDataHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  try {
    const result = await getChartData();
    res.json({ vacations: result });
  } catch (error) {
    next(error);
  }
}
async function createVacationHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  try {
    const result = await createVacation(req.body);
    res.json({ message: "Vacation Created", vacationId: result });
  } catch (error) {
    next(error);
  }
}

async function editVacationHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  try {
    const result = await editVacation(req.body);
    res.json({ message: "Vacation Edited", vac_id: result });
  } catch (error) {
    next(error);
  }
}

async function followVacationHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  try {
    const { vacation, isFollow } = req.body;
    const result = await followVacation(vacation.id, req.userData.id, isFollow);
    res.json({ message: "Vacation Followed", result });
  } catch (error) {
    next(error);
  }
}
async function deleteVacationHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  try {
    const { id } = req.params;
    const result: number = await deleteVacation(id);
    if (result === 1) res.json({ message: "Vacation Deleted" });
  } catch (error) {
    next(error);
  }
}

export default router;
