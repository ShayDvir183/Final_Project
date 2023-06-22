import express, { Request, Response } from "express";
import { createUser, IUserFullData, IUserLogin } from "./businessLogic";
import { isEmailExists, isPassMatch, isUserExists } from "./helpers";
import { signToken } from "./helpers/token";

const router = express.Router();

router.post("/login", loginHandler);
router.post("/register", registerHandler);

async function loginHandler(req: Request, res: Response): Response {
  const { password, user_name } = req.body;
  const user: IUserLogin = { password, user_name };
  const userExists: IUserFullData = await isUserExists(user);
  if (!userExists) return res.status(404).send("User not found");
  const passwordMatch = isPassMatch(user.password, userExists.password);
  if (!passwordMatch) {
    return res.status(401).json({
      message: "Unauthorized ! Please Contact Admin",
      token: null,
      role: null,
    });
  }
  const token: string = signToken(userExists);
  res.json({ message: "Login Success", token, role: userExists?.role });
}
async function registerHandler(req: Request, res: Response): Response {
  const { password, email, user_name, first_name, last_name } = req.body;
  const user: IUserFullData = {
    password,
    email,
    user_name,
    first_name,
    last_name,
  };
  const userExists: IUserFullData = await isUserExists({ user_name, password });
  const emailTaken: IUserFullData = await isEmailExists(user.email);
  if (!!userExists)
    return res
      .status(404)
      .send("Something Went Wrong ! Please Try Another User Name");
  if (!!emailTaken)
    return res
      .status(404)
      .send("Something Went Wrong ! Please Try Another Email");
  const result: number = await createUser(user);
  res.json({ message: "Register Success", userId: result });
}
export default router;
