import { store } from "..";
import { IVacationAdd } from "../../components/ui-components/dialog";
import { IVacation, setVacations } from "../reducers/vacationsReducer";
import { createVacation, deleteVacation, followVacation, getVacations } from "../services/vacationsService";



export async function deleteVacationAction(id:number){
    try{
        const result = await deleteVacation(id);
    }catch(ex){

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
export async function createVacationAction(vacation: IVacationAdd): Promise<any> {
    try {
        const result = await createVacation(vacation)
    } catch (error) {
    } finally {
    }
}
export async function followVacationAction(vacation: IVacation, isFollowed: boolean): Promise<any> {
    try {
        const result = await followVacation(vacation, isFollowed)
    } catch (error) {
    } finally {
    }
}