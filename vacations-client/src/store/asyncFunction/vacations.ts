import { store } from "..";
import {
  IVacation,
  setAdminDialogOpen,
  setChartData,
  setPaginationVacations,
  setVacations,
} from "../reducers/vacationsReducer";
import {
  createVacation,
  deleteVacation,
  editVacation,
  followVacation,
  getChartData,
  getVacations,
} from "../services/vacationsService";

export async function deleteVacationAction(id: number): Promise<void | any> {
  try {
    await deleteVacation(id);
  } catch (error: any) {
    return error;
  }
}
export async function getVacationsAction(): Promise<void | any> {
  try {
    const result = await getVacations();
    store.dispatch(setVacations(result.vacations));
    const p = localStorage.getItem("page");
    if (p) {
      store.dispatch(setPaginationVacations(parseInt(p)));
    } else {
      store.dispatch(setPaginationVacations(1));
    }
  } catch (error: any) {
    return error;
  }
}
export async function getChartDataAction(): Promise<void | any> {
  try {
    const result = await getChartData();
    store.dispatch(setChartData(result));
  } catch (error: any) {
    return error;
  }
}
export async function createVacationAction(
  vacation: IVacation
): Promise<void | any> {
  try {
    await createVacation(vacation);
    store.dispatch(
      setAdminDialogOpen({ isOpen: false, edit: false, text: "" })
    );

    getVacationsAction();
  } catch (error) {
    return error;
  }
}
export async function editVacationAction(
  vacation: IVacation
): Promise<void | any> {
  try {
    await editVacation(vacation);
    store.dispatch(
      setAdminDialogOpen({ isOpen: false, edit: false, text: "" })
    );
    getVacationsAction();
  } catch (error: any) {
    return error;
  }
}
export async function followVacationAction(
  vacation: IVacation,
  isFollow: boolean
): Promise<void | any> {
  try {
    await followVacation(vacation, isFollow);
  } catch (error: any) {
    return error;
  }
}
