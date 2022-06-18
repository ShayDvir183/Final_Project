import express from "express";
import { createUser, IUserFullData, IUserLogin } from "./businessLogic";
import { isEmailExists, isPassMatch, isUserExists } from "./helpers";
import { signToken } from "./helpers/token";


const router = express.Router();


router.post("/login", loginHandler)
router.post("/register", registerHandler)



async function loginHandler(req, res) {
    const { password, user_name } = req.body
    const user = { password, user_name }
    console.log(user)
    const userExists = await isUserExists(user)
    if (!userExists) return res.status(404).send("User not found");
    const passwordMatch = isPassMatch(user.password, userExists.password)
    if (!passwordMatch) return res.status(401).send("Unauthorized ! Please Contact Admin");
    console.log(userExists)
    const token = signToken(userExists)
    res.json({ message: "Login Success", token });
}
async function registerHandler(req, res) {
    const { password, email, user_name, first_name, last_name } = req.body
    const user: IUserFullData = { password, email, user_name, first_name, last_name }
    const userExists: IUserFullData = await isUserExists(user)
    const emailTaken: IUserFullData = await isEmailExists(user.email)
    if (!!userExists) return res.status(404).send("Something Went Wrong ! Please Try Another User Name");
    if (!!emailTaken) return res.status(404).send("Something Went Wrong ! Please Try Another Email");
    const result = await createUser(user)
    res.json({ message: "Register Success", result });
}

export default router;