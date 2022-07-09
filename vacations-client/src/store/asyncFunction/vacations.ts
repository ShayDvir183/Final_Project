import { store } from "..";
import {  IVacation, setAdminDialogOpen, setVacations } from "../reducers/vacationsReducer";
import { createVacation, deleteVacation, editVacation, followVacation, getVacations } from "../services/vacationsService";



export async function deleteVacationAction(id: number) {
    try {
        const result = await deleteVacation(id);
    } catch (ex) {

    }
}

export async function getVacationsAction(): Promise<any> {
    try {
        const result = await getVacations()
        store.dispatch(setVacations(result.data))
    } catch (error) {
    } finally {
    }
}
export async function createVacationAction(vacation: IVacation): Promise<any> {
    try {
        const result = await createVacation(vacation)

    } catch (error) {
    } finally {
        getVacationsAction()
    }
}
export async function editVacationAction(vacation: IVacation): Promise<any> {
    try {
        const result = await editVacation(vacation)
        store.dispatch(setAdminDialogOpen({ isOpen: false, edit: false }))

    } catch (error) {
    } finally {
        getVacationsAction()
    }
}


export async function followVacationAction(vacation: IVacation, isFollowed: boolean): Promise<any> {
    try {
        const result = await followVacation(vacation, isFollowed)
    } catch (error) {
    } finally {
    }
}