import { store } from "..";
import { IVacation, setVacations } from "../reducers/vacationsReducer";
import { createVacation, getVacations } from "../services/vacationsService";





export async function getVacationsAction(): Promise<any> {
    try {
        const result = await getVacations()
        store.dispatch(setVacations(result.data))
        return result.data
    } catch (error) {

    } finally {
    }
}
export async function createVacationAction(vacation: IVacation): Promise<any> {
    try {
        const result = await createVacation(vacation)
        console.log(result)
        
        return result.data
    } catch (error) {

    } finally {
    }
}