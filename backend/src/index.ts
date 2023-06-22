import express, { Request, Response, NextFunction, Error } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import bodyParser from "body-parser";
import { initDB } from "./db";
import loginRouter from "./auth";
import verifyToken from "./auth/helpers/token";
import vacationsRouter from "./vacations";

initDB();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get("/healthcheck", async (req: Request, res: Response) => {
  return res.send("Api is working!!");
});

app.use("/auth", loginRouter);
app.use(verifyToken);
app.use("/vacations", vacationsRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error.status)
    return res.status(error.status).json({ message: "Unauthorized" });
  return res.status(500).json({ message: "something went wrong" });
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Listening to Port: ${PORT}`);
});
