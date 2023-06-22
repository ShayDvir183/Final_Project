import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGetChartData } from "../services/vacationsService";
interface VacationsState {
  vacations: Array<IVacation>;
  followedVacations: Array<IVacation>;
  adminDialogOpen?: IDialog;
  paginationVacs: Array<IVacation>;
  page: number;
  chartData: Array<IGetChartData>;
}
interface IDialog {
  isOpen: boolean;
  edit: boolean;
  text: string;
  editVacation?: IVacation;
}
export interface IVacation {
  id: number;
  description: string;
  destination: string;
  from_date: Date | string;
  to_date: Date | string;
  price: number;
  image: string;
  ammount_of_followers: number;
  isFollowed?: boolean;
}

const initialState: VacationsState = {
  vacations: [],
  followedVacations: [],
  adminDialogOpen: { isOpen: false, edit: false, text: "" },
  paginationVacs: [],
  page: 1,
  chartData: [],
};

export const vacationsSlice = createSlice({
  name: "vacations",
  initialState,
  reducers: {
    setVacations: (
      state: VacationsState,
      action: PayloadAction<Array<IVacation>>
    ) => {
      state.vacations = action.payload;
    },
    setChartData: (
      state: VacationsState,
      action: PayloadAction<Array<IGetChartData>>
    ) => {
      state.chartData = action.payload;
    },
    setFollowedVacations: (
      state: VacationsState,
      action: PayloadAction<Array<IVacation>>
    ) => {
      state.followedVacations = action.payload.filter((vac: IVacation) => {
        return vac.isFollowed;
      });
    },
    setAdminDialogOpen: (
      state: VacationsState,
      action: PayloadAction<IDialog>
    ) => {
      state.adminDialogOpen = action.payload;
    },
    setPaginationVacations: (
      state: VacationsState,
      action: PayloadAction<number>
    ) => {
      state.page = action.payload;
      let start = (action.payload - 1) * 10;
      const end = start + 10;
      state.paginationVacs = state.vacations.slice(start, end);
      state.followedVacations = state.paginationVacs.filter(
        (vac: IVacation) => {
          return vac.isFollowed;
        }
      );
    },
  },
});
export const {
  setVacations,
  setChartData,
  setAdminDialogOpen,
  setFollowedVacations,
  setPaginationVacations,
} = vacationsSlice.actions;
export default vacationsSlice.reducer;
