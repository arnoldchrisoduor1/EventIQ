import { configureStore } from "@reduxjs/toolkit";
import sidebarOpenReducer from './slices/sidebarOpenSlice';
import menuReducer from "./slices/menuSlice";
import authReducer from "./slices/authSlice";
import editProfileReducer from "./slices/editProfileSlice";

const store = configureStore ({
    reducer: {
        sidebar: sidebarOpenReducer,
        menu: menuReducer,
        auth: authReducer,
        editProf: editProfileReducer,
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;