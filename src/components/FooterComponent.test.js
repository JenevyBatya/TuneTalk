import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import FooterNavigation from './FooterComponent';

const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);

    return render(
        <MemoryRouter initialEntries={[route]}>
            <Routes>
                <Route path="/Library" element={<div>Страница библиотеки</div>} />
                <Route path="/Subscriptions" element={<div>Страница подписок</div>} />
                <Route path="/Profile" element={<div>Страница профиля</div>} />
            </Routes>
            {ui}
        </MemoryRouter>
    );
};

describe('Компонент FooterNavigation', () => {
    it('Отображение элементов навигации', () => {
        renderWithRouter(<FooterNavigation />);

        expect(screen.getByLabelText('Библиотека')).toBeInTheDocument();
        expect(screen.getByLabelText('Мои подписки')).toBeInTheDocument();
        expect(screen.getByLabelText('Мой аккаунт')).toBeInTheDocument();
    });

    it('Подсвечивание текущего элемента на основе маршрута', () => {
        renderWithRouter(<FooterNavigation />, { route: '/Subscriptions' });

        expect(screen.getByLabelText('Библиотека')).toHaveStyle('color: #9DB2CE');
        expect(screen.getByLabelText('Мой аккаунт')).toHaveStyle('color: #9DB2CE');
    });

    it('Переход на корректный маршрут при клике на элемент', () => {
        renderWithRouter(<FooterNavigation />);

        fireEvent.click(screen.getByLabelText('Мои подписки'));

        expect(screen.getByText('Страница подписок')).toBeInTheDocument();
    });

    it('Обновление активного элемента навигации при смене маршрута', () => {
        const { rerender } = renderWithRouter(<FooterNavigation />, { route: '/Library' });

        rerender(
            <MemoryRouter initialEntries={['/Profile']}>
                <FooterNavigation />
            </MemoryRouter>
        );

        expect(screen.getByLabelText('Мой аккаунт')).toBeInTheDocument();
    });
});
