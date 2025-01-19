import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
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
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Registration failed";
        const errorStatus = error.response?.status || 500;
        return thunkAPI.rejectWithValue({message: errorMessage, status: errorStatus});
    }
});
