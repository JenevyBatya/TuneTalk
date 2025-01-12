import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Для тестирования с маршрутизацией
import FooterNavigation from './FooterComponent';
import { MemoryRouter } from 'react-router-dom';

describe('FooterNavigation Component', () => {
    test('should render the navigation bar with all actions', () => {
        render(
            <Router>
                <FooterNavigation />
            </Router>
        );

        // Проверка на наличие всех трех кнопок
        expect(screen.getByLabelText('Библиотека')).toBeInTheDocument();
        expect(screen.getByLabelText('Мои подписки')).toBeInTheDocument();
        expect(screen.getByLabelText('Мой аккаунт')).toBeInTheDocument();
    });

    test('should correctly highlight active navigation item based on current route', () => {
        render(
            <MemoryRouter initialEntries={['/Library']}>
                <FooterNavigation />
            </MemoryRouter>
        );

        // Проверка подсветки активной кнопки для маршрута "/Library"
        expect(screen.getByLabelText('Библиотека')).toHaveStyle('color: #1976D2');
        expect(screen.getByLabelText('Мои подписки')).toHaveStyle('color: #9DB2CE');
        expect(screen.getByLabelText('Мой аккаунт')).toHaveStyle('color: #9DB2CE');
    });

    test('should change route when an item is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/Library']}>
                <FooterNavigation />
            </MemoryRouter>
        );

        const subscriptionsButton = screen.getByLabelText('Мои подписки');
        fireEvent.click(subscriptionsButton);

        // Проверка, что после клика происходит переход на правильную страницу
        expect(window.location.pathname).toBe('/');
    });

    test('should update navigation state when route changes', () => {
        const { rerender } = render(
            <MemoryRouter initialEntries={['/Library']}>
                <FooterNavigation />
            </MemoryRouter>
        );

        // Проверяем начальное состояние для маршрута "/Library"
        expect(screen.getByLabelText('Библиотека')).toHaveStyle('color: #1976D2');
        expect(screen.getByLabelText('Мои подписки')).toHaveStyle('color: #9DB2CE');
        expect(screen.getByLabelText('Мой аккаунт')).toHaveStyle('color: #9DB2CE');

        // Перерендериваем компонент с новым маршрутом "/Subscriptions"
        rerender(
            <MemoryRouter initialEntries={['/Subscriptions']}>
                <FooterNavigation />
            </MemoryRouter>
        );

        // Проверяем состояние после изменения маршрута
        expect(screen.getByLabelText('Мои подписки')).toHaveStyle('color: #9DB2CE');
        expect(screen.getByLabelText('Библиотека')).toHaveStyle('color: #1976D2');
        expect(screen.getByLabelText('Мой аккаунт')).toHaveStyle('color: #9DB2CE');
    });});
