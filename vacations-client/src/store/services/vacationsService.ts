import { IVacation } from "../reducers/vacationsReducer";
import axiosInstance from "./index.axios";
const vacationsUrl = "http://localhost:3500/vacations";
const followUrl = "follow";
const chartUrl = "chart";
interface IGetVacationsRes {
  message: string;
  vacations: Array<IVacation>;
}
export interface IGetChartData {
  destination: string;
  ammount_of_followers: number;
}
export async function getVacations(): Promise<IGetVacationsRes | any> {
  try {
    const result = await axiosInstance.get(vacationsUrl);
    return result.data;
  } catch (error: any) {
    return error;
  }
}

export async function getChartData(): Promise<Array<IGetChartData> | any> {
  try {
    const result = await axiosInstance.get(`${vacationsUrl}/${chartUrl}`);
    return result.data.vacations;
  } catch (error: any) {
    return error;
  }
}

export async function createVacation(vacation: IVacation) {
  try {
    const result = await axiosInstance.post(vacationsUrl, vacation);
    return result;
  } catch (error: any) {
    return error;
  }
}
export async function deleteVacation(id: number) {
  try {
    const result = await axiosInstance.delete(`${vacationsUrl}/${id}`);
    return result;
  } catch (error: any) {
    return error;
  }
}

export async function followVacation(vacation: IVacation, isFollow: boolean) {
  try {
    const result = await axiosInstance.post(`${vacationsUrl}/${followUrl}`, {
      vacation,
      isFollow,
    });
    return result;
  } catch (error: any) {
    return error;
  }
}
export async function editVacation(vacation: IVacation) {
  try {
    const result = await axiosInstance.post(`${vacationsUrl}/edit`, vacation);
    return result;
  } catch (error: any) {
    return error;
  }
}
