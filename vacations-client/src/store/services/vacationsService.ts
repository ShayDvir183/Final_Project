import { IVacation } from "../reducers/vacationsReducer";
import axiosInstance from "./index.axios";
const vacationsUrl = "http://localhost:3500/vacations"



export async function getVacations() {
    try {
        const result = await axiosInstance.get(vacationsUrl)
        return result
    } catch (error: any) {
        return error
    }

}
export async function createVacation(vacation:IVacation) {
    try {
        const result = await axiosInstance.post(vacationsUrl, { vacation })
        return result
    } catch (error: any) {
        return error
    }

}