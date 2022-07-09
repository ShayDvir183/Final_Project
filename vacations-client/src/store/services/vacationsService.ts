import { IVacationAdd } from "../../components/ui-components/dialog";
import { IVacation } from "../reducers/vacationsReducer";
import axiosInstance from "./index.axios";
const vacationsUrl = "http://localhost:3500/vacations"
const followUrl = "follow"

export async function getVacations() {
    try {
        const result = await axiosInstance.get(vacationsUrl)
        return result
    } catch (error: any) {
        return error
    }

}

export async function createVacation(vacation: IVacationAdd) {
    try {
        const result = await axiosInstance.post(vacationsUrl, { vacation })
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

export async function followVacation(vacation: IVacation, isFollowed: boolean) {
    try {
        const result = await axiosInstance.post(`${vacationsUrl}/${followUrl}`, { vacation, isFollowed })
        return result
    } catch (error: any) {
        return error
    }

}
export async function editVacation(vacation: IVacation) {
    try {
        const result = await axiosInstance.post(`${vacationsUrl}/edit`, { vacation })
        return result
    } catch (error: any) {
        return error
    }

}