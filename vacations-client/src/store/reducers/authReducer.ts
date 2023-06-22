import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
  token: string | null;
  modalSetUp: IModal;
}
interface IModal {
  isOpen: boolean;
  message?: string;
}
const initialState: AuthState = {
  token: null,
  modalSetUp: { isOpen: false, message: "" },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: AuthState, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logOut: (state: AuthState) => {
      state.token = null;
    },
    setIsModalOpen: (state: AuthState, action: PayloadAction<IModal>) => {
      state.modalSetUp = action.payload;
    },
  },
});

export const { setUser, setIsModalOpen, logOut } = authSlice.actions;
export default authSlice.reducer;
