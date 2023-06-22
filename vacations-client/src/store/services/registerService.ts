import { IUserRegister } from "../asyncFunction/register";
import axiosInstance from "./index.axios";
const authBaseUrl = "http://localhost:3500/auth";
const registerUrl = "register";

export interface IRegRes {
  message: string;
}
export async function register(user: IUserRegister): Promise<IRegRes | any> {
  try {
    const result = await axiosInstance.post(
      `${authBaseUrl}/${registerUrl}`,
      user
    );
    return result.data;
  } catch (error: any) {
    return error;
  }
}
