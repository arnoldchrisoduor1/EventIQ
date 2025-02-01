import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;

interface EventsState {
    isLoading: boolean;
    error: string | null;
    message: string | null;
}

const initialState: EventsState = {
    isLoading: false,
    error: null,
    message: null,
    // eventBanerUrl: 
};

export const createEvent = createAsyncThunk(
    'events/create',
    async({ title, description, day, time, duration, location }: {
        title: string,
        description: string,
        day: string,
        time: string,
        duration: string,
        location: string
    }, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API_URL}/events/create`, {
                title, description, day, time, duration, location
            }, { withCredentials: true });

            return response.data;
        }
    };
)