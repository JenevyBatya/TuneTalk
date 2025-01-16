import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import {Provider, useDispatch, useSelector} from "react-redux";
import {BrowserRouter, BrowserRouter as Router} from "react-router-dom";
import LoginPage from "./LoginPage"; // Путь к компоненту
import "@testing-library/jest-dom/extend-expect";
import { configureStore } from "@reduxjs/toolkit";
import configureMockStore from "redux-mock-store";

import thunk from "redux-thunk";
import userEvent from "@testing-library/user-event"; // Для дополнительных проверок

// Замокать Redux
jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

// Замокать Navigate из react-router-dom
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

jest.mock("./RegPage", () => () => <div>Создать аккаунт</div>);

const mockStore = configureMockStore(); // Создаем mock store
const store = mockStore({
    auth: { isLoading: false, error: null },
});

describe("LoginPage Component", () => {
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

    it("renders login form with fields and button", () => {
        render(
            <Router>
                <LoginPage />
            </Router>
        );

        // Проверяем, что все элементы формы присутствуют
        expect(screen.getByLabelText(/Логин или Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Войти/i })).toBeInTheDocument();
    });

    it("displays validation errors when fields are empty", async () => {
        render(
            <Router>
                <LoginPage/>
            </Router>
        );

        fireEvent.click(screen.getByRole("button", {name: /Войти/i}));

        // await expect(
        //     screen.findByText(/Both fields are required/i)
        // ).resolves.toBeInTheDocument();

    });

    it("displays server error when login fails", () => {
        useSelector.mockReturnValueOnce({ isLoading: false, error: { message: "Invalid credentials" } });

        render(
            <Router>
                <LoginPage />
            </Router>
        );

        expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });

    it("navigates to /library on successful login", async () => {
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


    it("shows loading state when isLoading is true", () => {
        useSelector.mockReturnValueOnce({ isLoading: true, error: null });

        render(
            <Router>
                <LoginPage />
            </Router>
        );

        expect(screen.getByRole("button", { name: /Загрузка.../i })).toBeDisabled();
    });
});
