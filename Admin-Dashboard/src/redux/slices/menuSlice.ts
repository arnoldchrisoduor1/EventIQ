import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuState {
  activeMenuItem: string;
}

const initialState: MenuState = {
  activeMenuItem: '/',
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveMenuItem: (state, action: PayloadAction<string>) => {
        state.activeMenuItem = action.payload;
        console.log("Sidebar Navigation", state.activeMenuItem);
    },
  },
});

export const { setActiveMenuItem } = menuSlice.actions;

export default menuSlice.reducer;