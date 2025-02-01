import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CreateEventSlice {
    createEventState: boolean;
}

const initialState: CreateEventSlice = {
    createEventState: false,
}

const CreateEventSlice = createSlice ({
    name:'createEvent',
    initialState,
    reducers: {
        setCreateEventState: (state, action: PayloadAction<boolean>) => {
            state.createEventState = action.payload;
            console.log("Create event state is: ", state.createEventState);
        },
    },
});

export const { setCreateEventState } = CreateEventSlice.actions;
export default CreateEventSlice.reducer;