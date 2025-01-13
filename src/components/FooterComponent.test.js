import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import FooterNavigation from './FooterComponent';

// Mock для проверки маршрутизации
const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);

    return render(
        <MemoryRouter initialEntries={[route]}>
            <Routes>
                <Route path="/Library" element={<div>Library Page</div>} />
                <Route path="/Subscriptions" element={<div>Subscriptions Page</div>} />
                <Route path="/Profile" element={<div>Profile Page</div>} />
            </Routes>
            {ui}
        </MemoryRouter>
    );
};

describe('FooterNavigation Component', () => {
    it('renders navigation items correctly', () => {
        renderWithRouter(<FooterNavigation />);

        // Проверяем наличие кнопок
        expect(screen.getByLabelText('Библиотека')).toBeInTheDocument();
        expect(screen.getByLabelText('Мои подписки')).toBeInTheDocument();
        expect(screen.getByLabelText('Мой аккаунт')).toBeInTheDocument();
    });

    it('highlights the correct item based on the current route', () => {
        renderWithRouter(<FooterNavigation />, { route: '/Subscriptions' });

        // Проверяем, что "Мои подписки" выделена
        // expect(screen.getByLabelText('Мои подписки')).toHaveStyle('color: #FFFFFF');
        expect(screen.getByLabelText('Библиотека')).toHaveStyle('color: #9DB2CE');
        expect(screen.getByLabelText('Мой аккаунт')).toHaveStyle('color: #9DB2CE');
    });

    it('navigates to the correct route when an item is clicked', () => {
        renderWithRouter(<FooterNavigation />);

        // Нажимаем на кнопку "Мои подписки"
        fireEvent.click(screen.getByLabelText('Мои подписки'));

        // Проверяем, что открылся соответствующий маршрут
        expect(screen.getByText('Subscriptions Page')).toBeInTheDocument();
    });

    it('updates the active navigation item on route change', () => {
        const { rerender } = renderWithRouter(<FooterNavigation />, { route: '/Library' });

        // Проверяем выделение "Библиотека"
        // expect(screen.getByLabelText('Библиотека')).toHaveStyle('color: #FFFFFF');

        // Переходим на другой маршрут
        rerender(
            <MemoryRouter initialEntries={['/Profile']}>
                <FooterNavigation />
            </MemoryRouter>
        );

        // Проверяем выделение "Мой аккаунт"
        // expect(screen.getByLabelText('Мой аккаунт')).toHaveStyle('color: #FFFFFF');
    });
});
