import { store } from "..";
import { getTokenLS, setTokenLS } from "../ls";
import { setUser } from "../reducers/authReducer";
import { login } from "../services/loginService";
import { register } from "../services/registerService";




export async function registerAction(user: any): Promise<any> {
    try {
        const result = await register(user)
        return result
    } catch (error) {

    } finally {
    }
}