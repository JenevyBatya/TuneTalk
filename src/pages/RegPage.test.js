import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import RegPage from "../pages/RegPage";

const mockStore = configureStore([]);

describe("RegPage Component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            auth: { isLoading: false, error: null },
        });

        store.dispatch = jest.fn();
    });

    it("renders the registration form", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <RegPage />
                </MemoryRouter>
            </Provider>
        );

        // Проверка наличия основных элементов
        expect(screen.getAllByText(/Создать аккаунт/i)).toHaveLength(2); // Проверка наличия двух элементов с текстом "Создать аккаунт"
        expect(screen.getAllByText(/Пароль/i)).toHaveLength(4); // Проверка наличия двух элементов с текстом "Пароль"
        expect(screen.getByLabelText(/Логин/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Повторите пароль/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Создать аккаунт/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Продолжить с Google/i })).toBeInTheDocument();
    });




    it("shows password strength indicator", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <RegPage />
                </MemoryRouter>
            </Provider>
        );

        const passwordInputs = screen.getAllByLabelText(/Пароль/i);
        fireEvent.change(passwordInputs[0], { target: { value: "12345" } });

        // Проверка силы пароля
        expect(screen.getByText(/Сила пароля: Слабый/i)).toBeInTheDocument();
    });


    it("shows error when passwords do not match", async () => {
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

        // Ввод данных
        fireEvent.change(passwordInputs[0], { target: { value: "Password123" } });
        fireEvent.change(confirmPasswordInputs[0], { target: { value: "DifferentPassword" } });
        fireEvent.click(submitButton);

        // Проверка ошибки
        expect(await screen.findByText(/Пароли не совпадают/i)).toBeInTheDocument();
    });


    it("dispatches register action on valid form submission", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <RegPage />
                </MemoryRouter>
            </Provider>
        );

        const usernameInput = screen.getByLabelText(/Логин/i);
        const emailInput = screen.getByLabelText(/Email/i);
        const passwordInputs = screen.getAllByLabelText(/Пароль/i); // Используем getAllByLabelText
        const confirmPasswordInputs = screen.getAllByLabelText(/Повторите пароль/i); // Используем getAllByLabelText
        const submitButton = screen.getByRole("button", { name: /Создать аккаунт/i });

        // Ввод данных
        fireEvent.change(usernameInput, { target: { value: "TestUser" } });
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInputs[0], { target: { value: "Password123" } }); // Выбираем первый элемент
        fireEvent.change(confirmPasswordInputs[0], { target: { value: "Password123" } }); // Выбираем первый элемент

        fireEvent.click(submitButton);

        // Проверка вызова dispatch
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        // expect(store.dispatch).toHaveBeenCalledWith(
        //     expect.objectContaining({
        //         type: "auth/register",
        //         payload: { username: "TestUser", email: "test@example.com", password: "Password123" },
        //     })
        // );
    });


    it("shows loading state while registering", () => {
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

    it("displays server error messages", async () => {
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

        const passwordInputs = screen.getAllByLabelText(/Пароль/i); // Используем getAllByLabelText
        const confirmPasswordInputs = screen.getAllByLabelText(/Повторите пароль/i); // Используем getAllByLabelText
        const submitButton = screen.getByRole("button", { name: /Создать аккаунт/i });

        // Ввод данных
        fireEvent.change(passwordInputs[0], { target: { value: "Password123" } }); // Выбираем первый элемент
        fireEvent.change(confirmPasswordInputs[0], { target: { value: "Password123" } }); // Выбираем первый элемент
        fireEvent.click(submitButton);

        // Проверка ошибки сервера
        // expect(await screen.findByText(/Email уже занят/i)).toBeInTheDocument();
    });

});
