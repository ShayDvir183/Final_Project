import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface VacationsState {
    vacations: Array<IVacation>;
    followedVacations: Array<IVacation>;
    adminDialogOpen?: IDialog
    
}
interface IDialog{
    isOpen: boolean;
    edit: boolean;
    editVacation?: IVacation;
}
export interface IVacation {
    id: number;
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
    adminDialogOpen: {isOpen: false, edit: false}}


export const vacationsSlice = createSlice({
    name: "vacations",
    initialState,
    reducers: {
        setVacations: (state: VacationsState, action: PayloadAction<Array<IVacation>>) => {
            state.vacations = action.payload;
        },
        addVacation: (state: VacationsState, action: PayloadAction<IVacation>) => {
            state.vacations.push(action.payload)
            console.log(state.vacations, "state.vacations")
        }, followVacation: (state: VacationsState, action: PayloadAction<IVacation>) => {
            state.followedVacations = [...state.followedVacations, action.payload];
        }, unfollowVacation: (state: VacationsState, action: PayloadAction<IVacation>) => {
            state.followedVacations = state.followedVacations.filter(vacation => vacation.id !== action.payload.id);
        },
        setAdminDialogOpen: (state: VacationsState, action: PayloadAction<IDialog>) => {
            state.adminDialogOpen = action.payload;
        },
    },
});
export const { setVacations, followVacation, unfollowVacation, setAdminDialogOpen, addVacation } = vacationsSlice.actions;
export default vacationsSlice.reducer;
