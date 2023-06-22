import { getConnection } from "../../db";
import { IUserFullData, IUserLogin } from "../businessLogic";
import { getUsersQuery } from "../query";
const md5 = require("md5");

async function _getUsers(): Promise<Array<IUserFullData>> {
  const usersQuery = getUsersQuery();
  const usersResult: Array<[IUserFullData]> = await getConnection().query(
    usersQuery
  );
  return usersResult[0];
}

export function isPassMatch(password: string, dbPassword: string): Boolean {
  return md5(password) === dbPassword;
}

export async function isUserExists(user: IUserLogin): Promise<IUserFullData> {
  const users: Array<IUserFullData> = await _getUsers();
  const userExists: IUserFullData = users.find((u) => {
    return u.user_name === user.user_name;
  });
  return userExists;
}
export async function isEmailExists(
  email: string
): Promise<undefined | IUserFullData> {
  const users: Array<IUserFullData> = await _getUsers();
  const emailExists = users.find((u: IUserFullData) => u.email === email);
  return emailExists;
}
