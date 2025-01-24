import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditProfileSlice {
    editState: boolean;
}

const initialState: EditProfileSlice = {
    editState: false,
}

const editProfileSlice = createSlice({
    name: 'editProfile',
    initialState,
    reducers: {
        setEditProfileState: (state, action: PayloadAction<boolean>) => {
            state.editState = action.payload;
            console.log("Edit state is: ", state.editState);
        },
    },
});

export const { setEditProfileState } = editProfileSlice.actions;

export default editProfileSlice.reducer;