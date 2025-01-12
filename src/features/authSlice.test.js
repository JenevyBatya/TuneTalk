import authReducer, { login, register, logout } from './authSlice';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const API_URL = "http://26.227.27.136:80/auth";

describe('authSlice', () => {
    let mockAxios;

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
    });

    afterEach(() => {
        mockAxios.reset();
    });

    it('should return the initial state', () => {
        const initialState = {
            user: null,
            isLoading: false,
            error: null,
        };

        expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
    });

    describe('logout action', () => {
        it('should handle logout correctly', () => {
            const initialState = { user: { id: 1, name: 'John Doe' }, isLoading: false, error: null };
            const nextState = authReducer(initialState, logout());

            expect(nextState.user).toBeNull();
            expect(nextState.isLoading).toBe(false);
            expect(nextState.error).toBeNull();
        });
    });
});
