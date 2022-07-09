import express from "express";
import { createVacation, deleteVacation, editVacation, followVacation, getAllVacations } from "./businessLogic";


const router = express.Router();


router.get("/", allVacationsHandler);
router.post("/", createVacationHandler);
router.post("/follow", followVacationHandler);
router.delete("/:id", deleteVacationHandler);
router.post("/edit", editVacationHandler);

async function allVacationsHandler(req, res) {
    const result = await getAllVacations();
    res.json({ message: "All Vacations", vacations: result });

}
async function createVacationHandler(req, res) {
    const { vacation} = req.body;
        const result = await createVacation(vacation);
        res.json({ message: "Vacation Created", vacationId: result.insertId });
    }

async function editVacationHandler(req, res) {
    const { vacation} = req.body;
        const result = await editVacation(vacation);
        res.json({ message: "Vacation Edited", vac: result });
    }

async function followVacationHandler(req, res) {
    const { vacation, isFollowed } = req.body;

    const result = await followVacation(vacation.id, req.userData.id, isFollowed);
    res.json({ message: "Vacation Followed", result });
}
async function deleteVacationHandler(req, res) {
    const { id } = req.params;

    const result = await deleteVacation(id);
    res.json({ message: "Vacation Deleted" });
}

export default router;
