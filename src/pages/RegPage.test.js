import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import RegPage from './RegPage';

// Подавление всех ошибок и предупреждений
const suppressConsoleErrors = () => {
    const originalError = console.error;
    console.error = (...args) => {
        if (/Warning:.*not wrapped in act|Form control with the text of/.test(args[0])) {
            return;
        }
        originalError.call(console, ...args);
    };

    const originalWarn = console.warn;
    console.warn = (...args) => {
        if (/Warning:.*not wrapped in act|Form control with the text of/.test(args[0])) {
            return;
        }
        originalWarn.call(console, ...args);
    };
};

describe('RegPage component', () => {
    beforeAll(() => {
        suppressConsoleErrors();
    });

    test('renders registration form', () => {
        render(
            <MemoryRouter>
                <RegPage />
            </MemoryRouter>
        );
        expect(screen.getByLabelText(/логин/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/повторите пароль/i)).toBeInTheDocument();
    });

    test('shows error when passwords do not match', () => {
        render(
            <MemoryRouter>
                <RegPage />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByLabelText(/пароль/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/повторите пароль/i), { target: { value: 'password456' } });
        fireEvent.click(screen.getByRole('button', { name: /создать аккаунт/i }));
        expect(screen.getByText(/пароли не совпадают/i)).toBeInTheDocument();
    });

    test('shows password strength', () => {
        render(
            <MemoryRouter>
                <RegPage />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByLabelText(/пароль/i), { target: { value: 'Pass1234' } });
        expect(screen.getByText(/сила пароля: сильный/i)).toBeInTheDocument();
    });

    test('creates account with correct details', () => {
        render(
            <MemoryRouter>
                <RegPage />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByLabelText(/логин/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'testuser@example.com' } });
        fireEvent.change(screen.getByLabelText(/пароль/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/повторите пароль/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /создать аккаунт/i }));
        expect(screen.queryByText(/пароли не совпадают/i)).not.toBeInTheDocument();
        // Здесь можно добавить любые дополнительные проверки
    });
});
