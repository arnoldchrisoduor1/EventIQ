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
    profileImageUrl: string | null;
    token: string | null;
}

const initialState: AuthState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('user'),
    isVerified: localStorage.getItem('user') 
        ? JSON.parse(localStorage.getItem('user')!)?.isVerified 
        : false,
    isLoading: false,
    isCheckingAuth: true,
    error: null,
    message: null,
    profileImageUrl: localStorage.getItem('user') 
        ? JSON.parse(localStorage.getItem('user')!)?.profileImage 
        : null,
};

// ============== Sign Up Logic =========================== //
// Modify signup thunk to store user and token
export const signup = createAsyncThunk(
    'auth/signup',
    async({ firstname, lastname, email, password }: { 
        firstname: string; 
        lastname: string; 
        email: string; 
        password: string 
    }, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API_URL}/auth/signup`, { 
                firstname, 
                lastname, 
                email, 
                password 
            });
            
            // Store user and token in local storage
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
            
            return response.data;
        } catch (error: any) {
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
            const response = await axios.post(
                `${API_URL}/auth/login`, 
                { email, password },
                { withCredentials: true } // Important for handling cookies
            );
            
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            return response.data;
        } catch(error: any) {
            return rejectWithValue(error.response?.data?.message || 'Error logging in');
        }
    }
);

//  ============ Uploading images to aws s3 buckets ============= //

export const uploadImage = createAsyncThunk(
    'auth/uploadImg',
    async({ img } : { img: any }, {rejectWithValue}) => {
        let imgUrl = null;
        
        try {
            const response = await axios.get(`${API_URL}/auth/image-url`);
            const uploadURL = response.data.uploadURL;
            
            // Safe logging
            if (img instanceof File) {
                console.log("File before upload: ", {
                    name: img.name,
                    type: img.type,
                    size: img.size
                });
            } else {
                console.log("Uploaded object is not a File:", img);
            }
            
            await axios({
                method: 'PUT',
                url: uploadURL,
                headers: { 
                    'Content-Type': img.type || 'multipart/form-data'
                },
                data: img
            });
            
            imgUrl = uploadURL.split("?")[0];
            console.log("Uploaded image url: ", imgUrl);
        } catch (error: any) {
            console.error("Error uploading image:", error);
            return rejectWithValue(error.response?.data?.message || 'Error Uploading Image');
        }
        
        return imgUrl;
    }
)

// ================ Updating Profile Logic ================== //
export const updateprofile = createAsyncThunk(
    'auth/update-profile',
    async ({ firstname, lastname, email, address, mobilenumber, profilePhoto, occupation }: { firstname: string; lastname: string; email: string; address: string; mobilenumber: string; profilePhoto: string; occupation: string }, { rejectWithValue }) => {
        try {
            console.log("profile photo",profilePhoto);
            const response = await axios.put(`${API_URL}/auth/update-profile`, { firstname, lastname, email, address, mobilenumber, profilePhoto, occupation }, {withCredentials: true});
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return response.data;
        } catch (error: any) {
            console.log("Could not update profile: ", error);
            return rejectWithValue(error.response?.data?.message || 'Error updating details')
        }
    }
);

// ================ Logout Logic ======================= //
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        await axios.post(`${API_URL}/auth/logout`);
        
        // Clear local storage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    } catch(error: any) {
        return rejectWithValue(error || 'Error logging out');
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
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.isLoading = false;
        });
        builder.addCase(signup.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        // Uploading images to aws.
        builder.addCase(uploadImage.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(uploadImage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.profileImageUrl = action.payload as string;
        })
        builder.addCase(uploadImage.rejected, (state, action) => {
            state.error = action.payload as string;
            state.isLoading = false;
        })

        // Handling Updating user profile.
        builder.addCase(updateprofile.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(updateprofile.fulfilled, (state, action) => {
            state.user = action.payload.user;
            console.log("Updated user", action.payload.user)
            state.isLoading = false;
        })
        builder.addCase(updateprofile.rejected, (state, action) => {
            state.error = action.payload as string;
            state.isLoading = false;
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
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.isVerified = action.payload.user.isVerified;
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
        builder.addCase(logout.fulfilled, (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isVerified = false;
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