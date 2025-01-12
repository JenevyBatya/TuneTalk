import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import  LoginPage  from './LoginPage';
import {Provider, useSelector} from 'react-redux';
import { createStore } from 'redux';
import { login } from '../features/authSlice';

// Мокаем Redux состояния
jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

// Мокаем Redux Store и dispatch
const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

const mockStore = {
    auth: {
        isLoading: false,
        error: null,
    },
};

describe('LoginPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render login form correctly', () => {
        // Мокаем useSelector, чтобы вернуть состояние auth
        useSelector.mockReturnValue(mockStore.auth);

        render(
            <Provider store={{ getState: () => mockStore, dispatch: mockDispatch }}>
                <LoginPage />
            </Provider>
        );

        expect(screen.getByLabelText(/Логин или Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
        expect(screen.getByText(/Войти/i)).toBeInTheDocument();
    });

    it('should show error message if fields are empty and submit is clicked', async () => {
        useSelector.mockReturnValue(mockStore.auth);

        render(
            <Provider store={{ getState: () => mockStore, dispatch: mockDispatch }}>
                <LoginPage />
            </Provider>
        );

        fireEvent.click(screen.getByText('Войти'));

        await waitFor(() => {
            expect(screen.getByText(/Both fields are required/i)).toBeInTheDocument();
        });
    });

    it('should show error message if invalid email is entered', async () => {
        useSelector.mockReturnValue(mockStore.auth);

        render(
            <Provider store={{ getState: () => mockStore, dispatch: mockDispatch }}>
                <LoginPage />
            </Provider>
        );

        fireEvent.change(screen.getByLabelText(/Логин или Email/i), {
            target: { value: 'invalid-email' },
        });

        fireEvent.change(screen.getByLabelText(/Пароль/i), {
            target: { value: 'password' },
        });

        fireEvent.click(screen.getByText('Войти'));

        await waitFor(() => {
            expect(screen.getByText(/Please enter a valid email or username/i)).toBeInTheDocument();
        });
    });

    it('should dispatch login action and navigate to /library on successful login', async () => {
        const mockState = {
            auth: {
                isLoading: false,
                error: null,
            },
        };

        useSelector.mockReturnValue(mockState.auth);
        useDispatch.mockReturnValue(mockDispatch);

        render(
            <Provider store={{ getState: () => mockState, dispatch: mockDispatch }}>
                <LoginPage />
            </Provider>
        );

        fireEvent.change(screen.getByLabelText(/Логин или Email/i), {
            target: { value: 'user@example.com' },
        });

        fireEvent.change(screen.getByLabelText(/Пароль/i), {
            target: { value: 'password' },
        });

        fireEvent.click(screen.getByText('Войти'));

        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledWith(login({ identifier: 'user@example.com', password: 'password' }));
            expect(mockNavigate).toHaveBeenCalledWith('/library');
        });
    });

    it('should display error message if login fails', async () => {
        const mockState = {
            auth: {
                isLoading: false,
                error: 'Login failed, please try again.',
            },
        };

        useSelector.mockReturnValue(mockState.auth);

        render(
            <Provider store={{ getState: () => mockState, dispatch: mockDispatch }}>
                <LoginPage />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Login failed, please try again./i)).toBeInTheDocument();
        });
    });
});
