import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
    token: string | null;
}

const initialState: AuthState = {
    token: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state: AuthState, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
