import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import RegPage from "../pages/RegPage";

const mockStore = configureStore([]);

describe("Компонент RegPage", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            auth: { isLoading: false, error: null },
        });

        store.dispatch = jest.fn();
    });

    it("Отображает форму регистрации", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <RegPage />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getAllByText(/Создать аккаунт/i)).toHaveLength(2);
        expect(screen.getAllByText(/Пароль/i)).toHaveLength(4);
        expect(screen.getByLabelText(/Логин/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Повторите пароль/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Создать аккаунт/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Продолжить с Google/i })).toBeInTheDocument();
    });

    it("Отображает индикатор силы пароля", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <RegPage />
                </MemoryRouter>
            </Provider>
        );

        const passwordInputs = screen.getAllByLabelText(/Пароль/i);
        fireEvent.change(passwordInputs[0], { target: { value: "12345" } });

        expect(screen.getByText(/Сила пароля: Слабый/i)).toBeInTheDocument();
    });

    it("Отображает ошибку, если пароли не совпадают", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <RegPage />
                </MemoryRouter>
            </Provider>
        );

        const passwordInputs = screen.getAllByLabelText(/Пароль/i);
        const confirmPasswordInputs = screen.getAllByLabelText(/Повторите пароль/i);
        const submitButton = screen.getByRole("button", { name: /Создать аккаунт/i });

        fireEvent.change(passwordInputs[0], { target: { value: "Password123" } });
        fireEvent.change(confirmPasswordInputs[0], { target: { value: "DifferentPassword" } });
        fireEvent.click(submitButton);

        expect(await screen.findByText(/Пароли не совпадают/i)).toBeInTheDocument();
    });

    it("Отправляет действие регистрации при корректной отправке формы", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <RegPage />
                </MemoryRouter>
            </Provider>
        );

        const usernameInput = screen.getByLabelText(/Логин/i);
        const emailInput = screen.getByLabelText(/Email/i);
        const passwordInputs = screen.getAllByLabelText(/Пароль/i);
        const confirmPasswordInputs = screen.getAllByLabelText(/Повторите пароль/i);
        const submitButton = screen.getByRole("button", { name: /Создать аккаунт/i });

        fireEvent.change(usernameInput, { target: { value: "TestUser" } });
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInputs[0], { target: { value: "Password123" } });
        fireEvent.change(confirmPasswordInputs[0], { target: { value: "Password123" } });

        fireEvent.click(submitButton);

        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it("Отображает состояние загрузки при регистрации", () => {
        store = mockStore({
            auth: { isLoading: true, error: null },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <RegPage />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Регистрация.../i)).toBeInTheDocument();
    });

    it("Отображает ошибки сервера", async () => {
        store = mockStore({
            auth: { isLoading: false, error: { status: 418 } },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <RegPage />
                </MemoryRouter>
            </Provider>
        );

        const passwordInputs = screen.getAllByLabelText(/Пароль/i);
        const confirmPasswordInputs = screen.getAllByLabelText(/Повторите пароль/i);
        const submitButton = screen.getByRole("button", { name: /Создать аккаунт/i });

        fireEvent.change(passwordInputs[0], { target: { value: "Password123" } });
        fireEvent.change(confirmPasswordInputs[0], { target: { value: "Password123" } });
        fireEvent.click(submitButton);
    });
});
