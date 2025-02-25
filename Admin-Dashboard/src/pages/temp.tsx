export const submitEvent = createAsyncThunk(
  'event/submit',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;  // Change this line
      const eventData = state.addEvent;  // Change this line to match your reducer name
      
      console.log('State being sent:', eventData);
      
      if (!eventData.basicInfo.title) {
        return rejectWithValue('Title is required');
      }

      const response = await axios.post(
        `${API_URL}/events/events`, 
        eventData,  // Send eventData instead of state.event
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message || 'Failed to create event';
        return rejectWithValue(message);
      }
      return rejectWithValue('Failed to create event');
    }
  }
);

export const getAllEvents = createAsyncThunk(
  'event/getAll',
  async(_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/events/events`);
      return response.data;
      console.log("Events Response: ", response);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error getting events' );
    }
  }
);