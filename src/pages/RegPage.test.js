import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom"; // Для работы с history
import RegPage from "./RegPage";

// Мокируем модуль axios
jest.mock("axios");

const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("RegPage Component", () => {
    test("Рендеринг всех элементов формы", () => {
        renderWithRouter(<RegPage />);

        // Проверяем наличие всех полей формы
        expect(screen.getByLabelText(/Логин/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Повторите пароль/i)).toBeInTheDocument();

        // Проверяем кнопки
        expect(screen.getByText(/Создать аккаунт/i)).toBeInTheDocument();
        expect(screen.getByText(/Продолжить с Google/i)).toBeInTheDocument();
    });

    test("Отображение ошибки при несовпадении паролей", async () => {
        renderWithRouter(<RegPage />);

        const passwordInput = screen.getByLabelText(/Пароль/i);
        const confirmPasswordInput = screen.getByLabelText(/Повторите пароль/i);
        const submitButton = screen.getByText(/Создать аккаунт/i);

        // Заполняем поля
        fireEvent.change(passwordInput, { target: { value: "Password123" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "Password456" } });

        // Отправляем форму
        fireEvent.click(submitButton);

        // Проверяем наличие ошибки
        expect(await screen.findByText(/Пароли не совпадают/i)).toBeInTheDocument();
    });

    test("Отображение индикатора силы пароля", () => {
        renderWithRouter(<RegPage />);

        const passwordInput = screen.getByLabelText(/Пароль/i);

        // Вводим слабый пароль
        fireEvent.change(passwordInput, { target: { value: "123" } });
        expect(screen.getByText(/Сила пароля: Слабый/i)).toBeInTheDocument();

        // Вводим средний пароль
        fireEvent.change(passwordInput, { target: { value: "Password1" } });
        expect(screen.getByText(/Сила пароля: Средний/i)).toBeInTheDocument();

        // Вводим сильный пароль
        fireEvent.change(passwordInput, { target: { value: "Password123!" } });
        expect(screen.getByText(/Сила пароля: Сильный/i)).toBeInTheDocument();
    });

    test("Успешная регистрация и редирект", async () => {
        axios.post.mockResolvedValueOnce({ status: 201 });

        renderWithRouter(<RegPage />);

        const usernameInput = screen.getByLabelText(/Логин/i);
        const emailInput = screen.getByLabelText(/Email/i);
        const passwordInput = screen.getByLabelText(/Пароль/i);
        const confirmPasswordInput = screen.getByLabelText(/Повторите пароль/i);
        const submitButton = screen.getByText(/Создать аккаунт/i);

        // Заполняем поля
        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "Password123" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "Password123" } });

        // Отправляем форму
        fireEvent.click(submitButton);

        // Ждем редиректа
        await waitFor(() => expect(window.location.pathname).toBe("/library"));
    });

    test("Отображение серверной ошибки", async () => {
        axios.post.mockRejectedValueOnce({ response: { status: 418 } });

        renderWithRouter(<RegPage />);

        const usernameInput = screen.getByLabelText(/Логин/i);
        const emailInput = screen.getByLabelText(/Email/i);
        const passwordInput = screen.getByLabelText(/Пароль/i);
        const confirmPasswordInput = screen.getByLabelText(/Повторите пароль/i);
        const submitButton = screen.getByText(/Создать аккаунт/i);

        // Заполняем поля
        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "Password123" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "Password123" } });

        // Отправляем форму
        fireEvent.click(submitButton);

        // Проверяем наличие ошибки
        expect(await screen.findByText(/Email is already taken/i)).toBeInTheDocument();
    });
});
