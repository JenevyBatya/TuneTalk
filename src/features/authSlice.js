import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://26.227.27.136:80/auth";

export const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email: credentials.identifier,
            password: credentials.password,
        });
        return response.data; // Возвращаем данные при успехе
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Login failed";
        const errorStatus = error.response?.status || 500;
        return thunkAPI.rejectWithValue({message: errorMessage, status: errorStatus});
    }
});

export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Registration failed";
        const errorStatus = error.response?.status || 500;
        return thunkAPI.rejectWithValue({message: errorMessage, status: errorStatus});
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login reducers
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                localStorage.setItem("username", action.payload.login);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Register reducers
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                localStorage.setItem("username", action.payload.login);
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
