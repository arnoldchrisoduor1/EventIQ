import { configureStore } from "@reduxjs/toolkit";
import sidebarOpenReducer from './slices/sidebarOpenSlice';
import menuReducer from "./slices/menuSlice";

const store = configureStore ({
    reducer: {
        sidebar: sidebarOpenReducer,
        menu: menuReducer,
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;