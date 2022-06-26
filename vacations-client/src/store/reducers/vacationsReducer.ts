import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface VacationsState {
    vacations: Array<IVacation>;
    followedVacations: Array<IVacation>;
    adminDialogOpen: boolean;
}
export interface IVacation {
    id?: number;
    description: string;
    destination: string;
    from_date: Date;
    to_date: Date;
    price: number;
    image: string;
    ammount_of_followers?: number;
}

const initialState: VacationsState = {
    vacations: [],
    followedVacations: [],
    adminDialogOpen: false,

};

export const vacationsSlice = createSlice({
    name: "vacations",
    initialState,
    reducers: {
        setVacations: (state: VacationsState, action: PayloadAction<Array<IVacation>>) => {
            state.vacations = action.payload;
        }, followVacation: (state: VacationsState, action: PayloadAction<IVacation>) => {
            state.followedVacations = [...state.followedVacations, action.payload];
        }, unfollowVacation: (state: VacationsState, action: PayloadAction<IVacation>) => {
            state.followedVacations = state.followedVacations.filter(vacation => vacation.id !== action.payload.id);
        },
        setAdminDialogOpen: (state: VacationsState, action: PayloadAction<boolean>) => {
            state.adminDialogOpen = action.payload;
        },
    },
});
export const { setVacations, followVacation, unfollowVacation, setAdminDialogOpen } = vacationsSlice.actions;
export default vacationsSlice.reducer;
