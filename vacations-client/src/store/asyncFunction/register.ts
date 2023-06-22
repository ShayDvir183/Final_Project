import { register } from "../services/registerService";
interface IRegisterRes {
  message: string;
  userId: number;
}
export interface IUserRegister {
  user_name: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
}
export async function registerAction(
  user: IUserRegister
): Promise<IRegisterRes | any> {
  try {
    const result = await register(user);
    return result;
  } catch (error) {
    return error;
  }
}
