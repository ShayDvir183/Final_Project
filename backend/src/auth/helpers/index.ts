import { getConnection } from "../../db";
import { IUserFullData, IUserLogin } from "../businessLogic";
import { getUsersQuery } from "../query";



async function _getUsers() {
    const usersQuery = getUsersQuery()
    const usersResult: Array<any> = await getConnection().query(usersQuery)
    return usersResult[0]
}





export function isPassMatch(password: string, dbPassword: string) {
    return password === dbPassword;
}


export async function isUserExists(user: any) {
    const users: Array<any> = await _getUsers()
    const userExists = users.find((u) => {
        return u.user_name === user.user_name
    })
    return userExists;

}
export async function isEmailExists(email: string) {
    const users: Array<IUserFullData> = await _getUsers()
    const emailExists = users.find((u: IUserFullData) => u.email === email)
    return emailExists;
}