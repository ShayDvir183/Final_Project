import { store } from "..";
import { setVacations } from "../reducers/vacationsReducer";
import { getVacations } from "../services/vacationsService";





export async function getVacationsAction(): Promise<any> {
    try {
        const result = await getVacations()
        store.dispatch(setVacations(result.data))
        return result.data
    } catch (error) {

    } finally {
    }
}