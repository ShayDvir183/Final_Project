import express from "express";
import { createVacation, getAllVacations } from "./businessLogic";


const router = express.Router();


router.get("/", allVacationsHandler);
router.post("/", createVacationHandler);

async function allVacationsHandler(req, res) {
    const result = await getAllVacations();
    console.log("result", result);
    res.json({ message: "All Vacations", vacations: result });


}
async function createVacationHandler(req, res) {
    const { vacation } = req.body;
    console.log(req.body.vacation)

    const result = await createVacation(vacation);
    res.json({ message: "Vacation Created", vacationId: result.insertId });
}


export default router;
