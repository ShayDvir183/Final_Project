import express from "express";
import { getAllVacations } from "./businessLogic";


const router = express.Router();


router.get("/", allVacationsHandler);

async function allVacationsHandler(req, res) {
    const result = await getAllVacations();
    console.log("result", result);
    res.json({ message: "All Vacations", vacations: result });


}


export default router;
