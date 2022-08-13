import { IUserLogin } from "../asyncFunction/login";
import axiosInstance from "./index.axios";
const authBaseUrl = "http://localhost:3500/auth"
const registerUrl = "register"



export async function register(user: IUserLogin) {
    const result = await axiosInstance.post(`${authBaseUrl}/${registerUrl}`, user)
    console.log(result)
    return result.data

}