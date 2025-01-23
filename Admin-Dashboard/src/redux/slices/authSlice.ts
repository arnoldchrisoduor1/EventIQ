/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;

interface AuthState {
    user: any | null;
    isAuthenticated: boolean;
    isVerified: boolean;
    isLoading: boolean;
    isCheckingAuth: boolean;
    error: string | null;
    message: string | null;
}

// ============== Sign Up Logic =========================== //
export const signup = createAsyncThunk(
    'auth/signup',
    async({ firstname, lastname, email, password }: { 
        firstname: string; 
        lastname: string; 
        email: string; 
        password: string 
    }, {rejectWithValue}) => {
        try {
            // Log as an object to clearly see the structure
            console.log("signing in with the following details:", {
                firstname,
                lastname,
                email,
                password
            });
            
            const payload = { firstname, lastname, email, password };
            console.log("Request payload:", payload);  // Add this to verify payload
            
            const response = await axios.post(`${API_URL}/auth/signup`, payload);
            console.log("Sign Up response: ", response.data);
            return response.data;
        } catch (error: any) {
            console.log("Error details:", error.response?.data);  // Add this to see detailed error
            return rejectWithValue(error.response?.data?.message || 'Error signing up');
        }
    }
);


// ================== Verify Email Logic =================== //
export const verifyEmail = createAsyncThunk(
    'auth/verify-email',
    async({ code } : { code: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/verify-email`, { code });
            console.log('Verification email process response: ', response.data);
            return response.data;
        } catch(error: any) {
            return rejectWithValue(error.response?.data?.message || 'Error Verifying email');
        }
    }
);

// ================= Login Function ==================== //
export const login = createAsyncThunk(
    'auth/login',
    async({ email, password } : { email: string; password: string; }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            return response.data;
        } catch(error: any) {
            return rejectWithValue(error.response?.data?.message || 'Error logging in');
        }
    }
);

// ================ Logout Logic ======================= //
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        await axios.post(`${API_URL}/auth/logout`);
    } catch(error: any) {
        return rejectWithValue(error || 'Error loggin out');
    }
});

// ===================== Checking if the user is Authenticated =============
export const checkAuth = createAsyncThunk('auth/checkAuth', async(_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}/auth/check-auth`);
        console.log("Check auth response: ", response.data);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Error checking authentication' );
    }
});

// ====================== Forgot Password Logic =============================
export const forgotPassword = createAsyncThunk(
    'auth/forgot-password',
    async({ email } : { email: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
            console.log("Forgot password request response: ", response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Error requesting password reset.');
        }
    }
);

// =============== Reset Password Logic ======================= //
export const resetPassword = createAsyncThunk (
    'auth/reset-password',
    async({ token, password } : { token: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, { password });
            console.log("Reset password response: ", response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Error, could not reset password');
        }
    }
)

// Initial State
const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isVerified: false,
    isLoading: false,
    isCheckingAuth: true,
    error: null,
    message: null,
};


// ============== Auth Slice ===========================
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // Handling the signup.
        builder.addCase(signup.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(signup.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.isLoading = false;
        });
        builder.addCase(signup.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })

        // Handling the email verification.
        builder.addCase(verifyEmail.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(verifyEmail.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isLoading = false;
            state.isAuthenticated = true;
            state.isVerified = true;
        });
        builder.addCase(verifyEmail.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })

        // Handling the Login.
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.isLoading = false;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        // Handling Logout.
        builder.addCase(logout.pending, (state) => {
            state.isCheckingAuth = true;
            state.error = null;
        });
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = false;
            state.isCheckingAuth = false;
        });
        builder.addCase(checkAuth.rejected, (state) => {
            state.isCheckingAuth = false;
            state.isAuthenticated = false;
        });

        // Handling the forgot password.
        builder.addCase(forgotPassword.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.isAuthenticated = false;
        });
        builder.addCase(forgotPassword.fulfilled ,(state, action) => {
            state.user = action.payload.user;
            state.isLoading = false;
            state.isAuthenticated = true;
        });
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        // Handling the passowrd reset.
        builder.addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isLoading = false;
            state.isAuthenticated = true;
        });
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })
    }
});

export default authSlice.reducer;