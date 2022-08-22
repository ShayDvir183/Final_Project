import express from "express";
import { createVacation, deleteVacation, editVacation, followVacation, getAllVacations } from "./businessLogic";
import { getChartData } from "./chart";


const router = express.Router();


router.get("/", allVacationsHandler);
router.get("/chart", chartDataHandler);
router.post("/", createVacationHandler);
router.post("/follow", followVacationHandler);
router.delete("/:id", deleteVacationHandler);
router.post("/edit", editVacationHandler);

async function allVacationsHandler(req, res) {
    const result = await getAllVacations(req.userData.id);
    res.json({ message: "All Vacations", vacations: result });

}
async function chartDataHandler(req, res) {
    const result = await getChartData();
    res.json(result);
}
async function createVacationHandler(req, res) {
        const result = await createVacation(req.body);
        res.json({ message: "Vacation Created", vacationId: result.insertId });
    }

async function editVacationHandler(req, res) {
        const result = await editVacation(req.body);
        res.json({ message: "Vacation Edited", vac: result });
    }

async function followVacationHandler(req, res) {
    const  {vacation,isFollow} = req.body;
    const result = await followVacation(vacation.id, req.userData.id,isFollow);
    res.json({ message: "Vacation Followed", result });
}
async function deleteVacationHandler(req, res) {
    const { id } = req.params;
    const result = await deleteVacation(id);
    res.json({ message: "Vacation Deleted" });
}

export default router;
