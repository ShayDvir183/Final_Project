import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface VacationsState {
    vacations: Array<IVacation>;
    followedVacations: Array<IVacation>;
}
export interface IVacation {
    id: number;
    description: string;
    destination: string;
    from_date: Date;
    to_date: Date;
    price: number;
    image: string;
    ammount_of_followers: number;
}

const initialState: VacationsState = {
    vacations: [],
    followedVacations: [],
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
    },
});
export const { setVacations, followVacation, unfollowVacation } = vacationsSlice.actions;
export default vacationsSlice.reducer;
