import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

const API_URL = import.meta.env.VITE_API_URL;


// types.ts
export interface EventState {
    basicInfo: {
      title: string;
      description: string;
      category: 'concert' | 'conference' | 'workshop' | 'sports' | 'exhibition' | 'other';
      tags: string[];
      status: 'draft' | 'published' | 'cancelled' | 'postponed' | 'completed';
    };
    media: {
      banner: string;
      files: Array<{
        name: string;
        url: string;
        type: string;
      }>;
    };
    datetime: {
      date: string;
      time: string;
      duration: number;
      setupTime: string;
      teardownTime: string;
    };
    location: {
      name: string;
      address: string;
      city: string;
      state: string;
      country: string;
      zipcode: string;
      coordinates: {
        latitude: number;
        longitude: number;
      };
    };
    capacity: {
      total: number;
      ageRestriction: {
        minimum: number;
        maximum: number;
        required: boolean;
      };
    };
    organizer: {
      name: string;
      contactEmail: string;
      contactPhone: string;
      website: string;
      socialMedia: {
        facebook: string;
        twitter: string;
        instagram: string;
        linkedIn: string;
      };
    };
    schedule: Array<{
      time: string;
      title: string;
      description: string;
      speaker: {
        name: string;
        bio: string;
        photo: string;
        email: string;
      };
    }>;
    ticketing: Array<{
      name: string;
      price: number;
      quantity: number;
      description: string;
      earlyBirdDeadline: string;
      earlyBirdPrice: number;
    }>;
    additionalInfo: {
      entryRequirements: {
        dressCode: string;
        isRequired: boolean;
        additionalRequirements: string[];
      };
      parking: {
        available: boolean;
        information: string;
        fee: number;
      };
      accessibility: {
        wheelchairAccessibile: boolean;
        assistanceAvailable: boolean;
        additionalInfo: string;
      };
    };
    policies: {
      refund: string;
      cancellation: string;
      photography: string;
      weather: string;
    };
    submission: {
      loading: boolean;
      error: string | null;
      success: boolean;
    }
  }
  // slice.ts
  
  const initialState: EventState = {
    basicInfo: {
      title: '',
      description: '',
      category: 'other',
      tags: [],
      status: 'draft',
    },
    media: {
      banner: '',
      files: [],
    },
    datetime: {
      date: '',
      time: '',
      duration: 0,
      setupTime: '',
      teardownTime: '',
    },
    location: {
      name: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zipcode: '',
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
    },
    capacity: {
      total: 0,
      ageRestriction: {
        minimum: 0,
        maximum: 0,
        required: false,
      },
    },
    organizer: {
      name: '',
      contactEmail: '',
      contactPhone: '',
      website: '',
      socialMedia: {
        facebook: '',
        twitter: '',
        instagram: '',
        linkedIn: '',
      },
    },
    schedule: [],
    ticketing: [],
    additionalInfo: {
      entryRequirements: {
        dressCode: '',
        isRequired: false,
        additionalRequirements: [],
      },
      parking: {
        available: false,
        information: '',
        fee: 0,
      },
      accessibility: {
        wheelchairAccessibile: false,
        assistanceAvailable: false,
        additionalInfo: '',
      },
    },
    policies: {
      refund: '',
      cancellation: '',
      photography: '',
      weather: '',
    },
    submission: {
      loading: false,
      error: null,
      success: false,
    },
  };
  
  const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
      updateBasicInfo: (state, action: PayloadAction<Partial<EventState['basicInfo']>>) => {
        state.basicInfo = { ...state.basicInfo, ...action.payload };
      },
      updateMedia: (state, action: PayloadAction<Partial<EventState['media']>>) => {
        state.media = { ...state.media, ...action.payload };
      },
      updateDateTime: (state, action: PayloadAction<Partial<EventState['datetime']>>) => {
        state.datetime = { ...state.datetime, ...action.payload };
      },
      updateLocation: (state, action: PayloadAction<Partial<EventState['location']>>) => {
        state.location = { ...state.location, ...action.payload };
      },
      updateCapacity: (state, action: PayloadAction<Partial<EventState['capacity']>>) => {
        state.capacity = { ...state.capacity, ...action.payload };
      },
      updateOrganizer: (state, action: PayloadAction<Partial<EventState['organizer']>>) => {
        state.organizer = { ...state.organizer, ...action.payload };
      },
      addScheduleItem: (state, action: PayloadAction<EventState['schedule'][0]>) => {
        state.schedule.push(action.payload);
      },
      updateScheduleItem: (state, action: PayloadAction<{ index: number; item: Partial<EventState['schedule'][0]> }>) => {
        state.schedule[action.payload.index] = { 
          ...state.schedule[action.payload.index], 
          ...action.payload.item 
        };
      },
      removeScheduleItem: (state, action: PayloadAction<number>) => {
        state.schedule.splice(action.payload, 1);
      },
      addTicketTier: (state, action: PayloadAction<EventState['ticketing'][0]>) => {
        state.ticketing.push(action.payload);
      },
      updateTicketTier: (state, action: PayloadAction<{ index: number; item: Partial<EventState['ticketing'][0]> }>) => {
        state.ticketing[action.payload.index] = {
          ...state.ticketing[action.payload.index],
          ...action.payload.item
        };
      },
      removeTicketTier: (state, action: PayloadAction<number>) => {
        state.ticketing.splice(action.payload, 1);
      },
      updateAdditionalInfo: (state, action: PayloadAction<Partial<EventState['additionalInfo']>>) => {
        state.additionalInfo = { ...state.additionalInfo, ...action.payload };
      },
      updatePolicies: (state, action: PayloadAction<Partial<EventState['policies']>>) => {
        state.policies = { ...state.policies, ...action.payload };
      },
      resetSubmissionStatus: (state) => {
        state.submission = {
          loading: false,
          error: null,
          success: false,
        };
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(submitEvent.pending, (state) => {
          state.submission.loading = true;
          state.submission.error = null;
          state.submission.success = false;
        })
        .addCase(submitEvent.fulfilled, (state) => {
          state.submission.loading = false;
          state.submission.error = null;
          state.submission.success = true;
        })
        .addCase(submitEvent.rejected, (state, action) => {
          state.submission.loading = false;
          state.submission.error = action.payload as string;
          state.submission.success = false;
        });
    },
  });


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
  
  export const {
    updateBasicInfo,
    updateMedia,
    updateDateTime,
    updateLocation,
    updateCapacity,
    updateOrganizer,
    addScheduleItem,
    updateScheduleItem,
    removeScheduleItem,
    addTicketTier,
    updateTicketTier,
    removeTicketTier,
    updateAdditionalInfo,
    updatePolicies,
    resetSubmissionStatus
  } = eventSlice.actions;
  
  export default eventSlice.reducer;