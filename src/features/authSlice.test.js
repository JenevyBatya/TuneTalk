import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import authReducer, { login, register, logout } from "./authSlice";

// Создаем мок для axios
const mockAxios = new MockAdapter(axios);

describe("authSlice", () => {
    let store;

    beforeEach(() => {
        // Инициализация redux store для каждого теста
        store = configureStore({
            reducer: {
                auth: authReducer,
            },
        });
        mockAxios.reset(); // Сброс состояния мока
    });




    test("должен выполнять login с ошибкой", async () => {
        // Мокаем ошибку для запроса login
        const mockError = { message: "Login failed" };
        mockAxios.onPost("http://26.227.27.136:80/auth/login").reply(500, mockError);

        // Диспатчим login action
        await store.dispatch(login({ identifier: "wrong@example.com", password: "wrongpassword" }));

        // Получаем state из store
        const state = store.getState().auth;

        // Проверяем, что ошибка установлена в store
        expect(state.isLoading).toBe(false);
        expect(state.user).toBeNull();
        expect(state.error).toHaveProperty('message');  // Просто проверяем наличие сообщения об ошибке
    });





    test("должен выполнять register с ошибкой", async () => {
        // Мокаем ошибку для запроса register
        const mockError = { message: "Registration failed" };
        mockAxios.onPost("http://26.227.27.136:80/auth/register").reply(500, mockError);

        // Диспатчим register action
        await store.dispatch(register({ email: "newuser@example.com", password: "password123" }));

        // Проверяем, что ошибка установлена в store
        const state = store.getState().auth;
        expect(state.isLoading).toBe(false);
        expect(state.user).toBeNull();
        expect(state.error).not.toBeNull();  // Проверяем, что ошибка не null
        expect(state.error.message).toBe("Registration failed");  // Проверяем сообщение об ошибке
    });


    test("должен выполнять logout", () => {
        // Предполагаем, что пользователь уже авторизован
        store.dispatch({ type: "auth/login/fulfilled", payload: { id: 1, name: "Test User" } });

        // Выполняем logout
        store.dispatch(logout());

        // Проверяем, что пользователь вышел
        const state = store.getState().auth;
        expect(state.user).toBeNull();
    });
});
