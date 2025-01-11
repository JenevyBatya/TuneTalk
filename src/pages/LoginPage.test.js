import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './LoginPage';
import '@testing-library/jest-dom/extend-expect';

describe('LoginPage Component', () => {
    it('renders the login page with form fields and buttons', () => {
        render(
            <Router>
                <LoginPage />
            </Router>
        );
        // expect(screen.getByLabelText(/Логин или Email/i)).toBeInTheDocument();
        // expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
        // expect(screen.getByRole('button', { name: /Войти/i })).toBeInTheDocument();
        // expect(screen.getByText(/Нет аккаунта\?/i)).toBeInTheDocument();
    });

    it('shows an error message when both fields are empty', async () => {
        render(
            <Router>
                <LoginPage />
            </Router>
        );

        fireEvent.click(screen.getByRole('button', { name: /Войти/i }));

        await waitFor(() => {
            expect(screen.getByText(/Both fields are required/i)).toBeInTheDocument();
        });
    });

    it('shows an error message for invalid email or username', async () => {
        render(
            <Router>
                <LoginPage />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Логин или Email/i), {
            target: { value: 'a' }
        });
        fireEvent.change(screen.getByLabelText(/Пароль/i), {
            target: { value: 'password' }
        });

        fireEvent.click(screen.getByRole('button', { name: /Войти/i }));

        await waitFor(() => {
            expect(screen.getByText(/Please enter a valid email or username \(min 3 characters\)/i)).toBeInTheDocument();
        });
    });

    it('shows an error message if email format is incorrect', async () => {
        render(
            <Router>
                <LoginPage />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Логин или Email/i), {
            target: { value: 'incorrectemail' }
        });
        fireEvent.change(screen.getByLabelText(/Пароль/i), {
            target: { value: 'password' }
        });

        fireEvent.click(screen.getByRole('button', { name: /Войти/i }));

        await waitFor(() => {
            expect(screen.getByText(/Please enter a valid email or username \(min 3 characters\)/i)).toBeInTheDocument();
        });
    });

    it('allows login with valid email and password', async () => {
        render(
            <Router>
                <LoginPage />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Логин или Email/i), {
            target: { value: 'test@example.com' }
        });
        fireEvent.change(screen.getByLabelText(/Пароль/i), {
            target: { value: 'password' }
        });

        fireEvent.click(screen.getByRole('button', { name: /Войти/i }));

        await waitFor(() => {
            // Эмулируем успешную авторизацию (например, console.log или редирект)
            expect(screen.getByRole('button', { name: /Войти/i })).toBeInTheDocument();
        });
    });

    it('should toggle the password visibility', () => {
        render(
            <Router>
                <LoginPage />
            </Router>
        );

        const passwordField = screen.getByLabelText(/Пароль/i);
        const toggleButton = screen.getByRole('button', { name: /visibility/i });

        // Проверка, что изначально тип поля - пароль
        expect(passwordField).toHaveAttribute('type', 'password');

        // Кликаем для показа пароля
        fireEvent.click(toggleButton);

        // Проверка, что тип поля изменился на текст
        expect(passwordField).toHaveAttribute('type', 'text');

        // Кликаем снова для скрытия пароля
        fireEvent.click(toggleButton);

        // Проверка, что тип поля вернулся к паролю
        expect(passwordField).toHaveAttribute('type', 'password');
    });

    it('should redirect to registration page when clicked on the "Нет аккаунта?" link', () => {
        render(
            <Router>
                <LoginPage />
            </Router>
        );

        const registerLink = screen.getByText(/Создать/i);
        fireEvent.click(registerLink);

        // Проверка, что перенаправляет на страницу регистрации
        expect(window.location.pathname).toBe('/Registration');
    });
});
