import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
import bodyParser from "body-parser";
import { initDB } from './db';
import loginRouter from "./login"

initDB()
const app = express();
app.use(cors());
app.use(bodyParser.json())

app.use("/auth", loginRouter)


app.get("/healthcheck", async (req, res) => {
    return res.send("Api is working!!");
});











const { PORT } = process.env;
app.listen(PORT, () => {
    console.log(`Listening to Port: ${PORT}`);
});


