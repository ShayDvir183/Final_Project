import { store } from "..";
import {  IVacation, setAdminDialogOpen, setChartData, setFollowedVacations, setPaginationVacations, setVacations } from "../reducers/vacationsReducer";
import { createVacation, deleteVacation, editVacation, followVacation, getChartData, getVacations } from "../services/vacationsService";

export async function deleteVacationAction(id: number) {
    try {
        await deleteVacation(id);
    } catch (ex) {

    }
}
export async function getVacationsAction(): Promise<any> {
    try {
        const result = await getVacations()
        store.dispatch(setVacations(result.data.vacations))
        const p = localStorage.getItem("page")
          if(p){
            console.log(`inside if`)
             store.dispatch(setPaginationVacations(parseInt(p)))
          }else{
            console.log(`inside else `)

            store.dispatch(setPaginationVacations(1))
          }
    } catch (error) {
    } finally {
    }
}
export async function getChartDataAction(): Promise<any> {
    try {
        const result = await getChartData()
        console.log(result)
        store.dispatch(setChartData(result))
        // const followedVacations = result.data.vacations.filter((vac: IVacation) => { return vac.isFollow })
        // store.dispatch(setFollowedVacations(followedVacations))
    } catch (error) {
    } finally {
    }
}
export async function createVacationAction(vacation: IVacation): Promise<any> {
    try {
        await createVacation(vacation)
        store.dispatch(setAdminDialogOpen({ isOpen: false, edit: false,text:"" }))

        getVacationsAction()
    } catch (error) {
    } finally {
    }
}
export async function editVacationAction(vacation: IVacation): Promise<any> {
    try {
        await editVacation(vacation)
        store.dispatch(setAdminDialogOpen({ isOpen: false, edit: false,text:"" }))
        getVacationsAction()

    } catch (error) {
    } finally {
    }
}
export async function followVacationAction(vacation: IVacation,isFollow:boolean): Promise<any> {
    try {
       await followVacation(vacation,isFollow)
       
    } catch (error) {
    } finally {
    }
}