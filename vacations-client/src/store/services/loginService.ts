import { ILoginRes, IUserLogin } from "../asyncFunction/login";
import axiosInstance from "./index.axios";
const authBaseUrl = "http://localhost:3500/auth";
const loginUrl = "login";

export async function login(user: IUserLogin): Promise<ILoginRes> {
  try {
    const result = await axiosInstance.post(`${authBaseUrl}/${loginUrl}`, user);
    return result.data;
  } catch (error: any) {
    return error;
  }
}
