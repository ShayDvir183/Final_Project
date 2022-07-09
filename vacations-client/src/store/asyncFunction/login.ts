import { store } from "..";
import { getTokenLS, setTokenLS, setRoleLS, clearToken_RoleLS } from "../ls";
import { logOut, setUser } from "../reducers/authReducer";
import { login } from "../services/loginService";



export interface IUserLogin {
    user_name: string | undefined;
    password: string | undefined;
}

export async function loginAction(user: IUserLogin): Promise<any> {
    const isTokenExists = getTokenLS();
    if (isTokenExists) {
        return
    }
    try {
        const loginRes = await login(user)
        store.dispatch(setUser(loginRes.token));
        setTokenLS(loginRes.token)
        setRoleLS(loginRes.role)
    } catch (error) {

    } finally {
    }
}

export async function logOutAction(token: string | null): Promise<any> {
    try {
        clearToken_RoleLS()
        store.dispatch(logOut());

    } catch (error) {

    } finally {
    }
}



