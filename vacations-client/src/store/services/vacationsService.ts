import { IVacation } from "../reducers/vacationsReducer";
import axiosInstance from "./index.axios";
const vacationsUrl = "http://localhost:3500/vacations"
const followUrl = "follow"
const chartUrl = "chart"
export async function getVacations() {
    try {
        const result = await axiosInstance.get(vacationsUrl)
        return result
    } catch (error: any) {
        return error
    }

}
export async function getChartData() {
    try {
        const result = await axiosInstance.get(`${vacationsUrl}/${chartUrl}`)
        return result.data
    } catch (error: any) {
        return error
    }

}

export async function createVacation(vacation: IVacation) {
    try {
        const result = await axiosInstance.post(vacationsUrl, vacation)
        return result
    } catch (error: any) {
        return error
    }

}
export async function deleteVacation(id: number) {
    try {
        const result = await axiosInstance.delete(`${vacationsUrl}/${id}`)
        return result
    } catch (error: any) {
        return error
    }

}

export async function followVacation(vacation: IVacation,isFollow:boolean) {
    try {
        const result = await axiosInstance.post(`${vacationsUrl}/${followUrl}`, {vacation,isFollow})
        return result
    } catch (error: any) {
        return error
    }

}
export async function editVacation(vacation: IVacation) {
    try {
        const result = await axiosInstance.post(`${vacationsUrl}/edit`,  vacation )
        return result
    } catch (error: any) {
        return error
    }

}