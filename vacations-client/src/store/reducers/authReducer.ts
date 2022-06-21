import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
    token: string | null;
    isModalOpen: boolean;
}

const initialState: AuthState = {
    token: null,
    isModalOpen: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state: AuthState, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setIsModalOpen: (state: AuthState, action: PayloadAction<boolean>) => {
            console.log("setIsModalOpen", action.payload);
            state.isModalOpen = action.payload;
        }
        ,
    },
});

export const { setUser, setIsModalOpen } = authSlice.actions;
export default authSlice.reducer;
