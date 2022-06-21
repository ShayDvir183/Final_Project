import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import vacationsReducer from "./reducers/vacationsReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        vacations: vacationsReducer
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;