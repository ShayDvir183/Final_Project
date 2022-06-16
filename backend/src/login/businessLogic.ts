import { getConnection } from "../db";
import { isUserExists } from "./helpers";
import { getCreateUserQuery } from "./query";



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
    const result = await getConnection().execute(query, [user.first_name, user.last_name, user.email, user.user_name, user.password])
    return result;
}