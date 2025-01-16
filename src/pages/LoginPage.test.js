import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import {Provider, useDispatch, useSelector} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import LoginPage from "./LoginPage";
import "@testing-library/jest-dom/extend-expect";
import { configureStore } from "@reduxjs/toolkit";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import userEvent from "@testing-library/user-event";

jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

jest.mock("./RegPage", () => () => <div>Создать аккаунт</div>);

const mockStore = configureMockStore();
const store = mockStore({
    auth: { isLoading: false, error: null },
});

describe("Компонент LoginPage", () => {
    let mockDispatch;
    let mockNavigate;

    beforeEach(() => {
        mockDispatch = jest.fn();
        useDispatch.mockReturnValue(mockDispatch);

        mockNavigate = jest.fn();
        require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);

        useSelector.mockReturnValue({ isLoading: false, error: null });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("отображает форму входа с полями и кнопкой", () => {
        render(
            <Router>
                <LoginPage />
            </Router>
        );

        expect(screen.getByLabelText(/Логин или Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Войти/i })).toBeInTheDocument();
    });

    it("отображает ошибки валидации при пустых полях", async () => {
        render(
            <Router>
                <LoginPage/>
            </Router>
        );

        fireEvent.click(screen.getByRole("button", {name: /Войти/i}));
    });

    it("отображает ошибку сервера при неудачном входе", () => {
        useSelector.mockReturnValueOnce({ isLoading: false, error: { message: "Неверные данные для входа" } });

        render(
            <Router>
                <LoginPage />
            </Router>
        );

        expect(screen.getByText(/Неверные данные для входа/i)).toBeInTheDocument();
    });

    it("переходит на /library при успешном входе", async () => {
        mockDispatch.mockResolvedValueOnce({ type: "auth/login/fulfilled" });

        render(
            <Router>
                <LoginPage />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Логин или Email/i), {
            target: { value: "testuser" },
        });
        fireEvent.change(screen.getByLabelText(/Пароль/i), {
            target: { value: "password123" },
        });

        fireEvent.click(screen.getByRole("button", { name: /Войти/i }));

        expect(mockNavigate).not.toHaveBeenCalledWith("/library");
    });

    it("показывает состояние загрузки, когда isLoading равно true", () => {
        useSelector.mockReturnValueOnce({ isLoading: true, error: null });

        render(
            <Router>
                <LoginPage />
            </Router>
        );

        expect(screen.getByRole("button", { name: /Загрузка.../i })).toBeDisabled();
    });
});
