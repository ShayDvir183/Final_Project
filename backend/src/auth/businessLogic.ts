import { getConnection } from "../db";
import { isUserExists } from "./helpers";
import { getCreateUserQuery } from "./query";
const md5 = require("md5")


export interface IUserFullData {
    password: string;
    email: string
    user_name: string
    first_name: string
    last_name: string
}
export interface IUserLogin {
    password: string;
    email: string
    user_name: string
}

// check aviablity of redux on server side - what is better sql or redux?

export async function createUser(user: IUserFullData) {
    const query: string = getCreateUserQuery()
    const md5Pass = md5(user.password)
    const result = await getConnection().execute(query, [user.first_name, user.last_name, user.email, user.user_name, md5Pass])
    
    return result.insertId;
}