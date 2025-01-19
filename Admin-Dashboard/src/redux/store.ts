import { configureStore } from "@reduxjs/toolkit";
import sidebarOpenReducer from './slices/sidebarOpenSlice';
import menuReducer from "./slices/menuSlice";
import authReducer from "./slices/authSlice";

const store = configureStore ({
    reducer: {
        sidebar: sidebarOpenReducer,
        menu: menuReducer,
        auth: authReducer,
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;