import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import authReducer, { login, register, logout } from "./authSlice";

const mockAxios = new MockAdapter(axios);

describe("authSlice", () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                auth: authReducer,
            },
        });
        mockAxios.reset();
    });

    test("Логин с ошибкой", async () => {
        const mockError = { message: "Login failed" };
        mockAxios.onPost("http://26.227.27.136:80/auth/login").reply(500, mockError);

        await store.dispatch(login({ identifier: "wrong@example.com", password: "wrongpassword" }));

        const state = store.getState().auth;

        expect(state.isLoading).toBe(false);
        expect(state.user).toBeNull();
        expect(state.error).toHaveProperty('message');
    });

    test("Регистрация с ошибкой", async () => {
        const mockError = { message: "Registration failed" };
        mockAxios.onPost("http://26.227.27.136:80/auth/register").reply(500, mockError);

        await store.dispatch(register({ email: "newuser@example.com", password: "password123" }));

        const state = store.getState().auth;
        expect(state.isLoading).toBe(false);
        expect(state.user).toBeNull();
        expect(state.error).not.toBeNull();
        expect(state.error.message).toBe("Registration failed");
    });

    test("Выход из аккаунта", () => {
        store.dispatch({ type: "auth/login/fulfilled", payload: { id: 1, name: "Test User" } });

        store.dispatch(logout());

        const state = store.getState().auth;
        expect(state.user).toBeNull();
    });
});
