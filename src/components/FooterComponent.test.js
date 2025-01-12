import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FooterNavigation from './FooterComponent';
import { MemoryRouter } from 'react-router-dom';

describe('FooterNavigation Component', () => {
    test('should render the navigation bar with all actions', () => {
        render(
            <Router>
                <FooterNavigation />
            </Router>
        );


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


        expect(window.location.pathname).toBe('/');
    });

    test('should update navigation state when route changes', () => {
        const { rerender } = render(
            <MemoryRouter initialEntries={['/Library']}>
                <FooterNavigation />
            </MemoryRouter>
        );


        expect(screen.getByLabelText('Библиотека')).toHaveStyle('color: #1976D2');
        expect(screen.getByLabelText('Мои подписки')).toHaveStyle('color: #9DB2CE');
        expect(screen.getByLabelText('Мой аккаунт')).toHaveStyle('color: #9DB2CE');


        rerender(
            <MemoryRouter initialEntries={['/Subscriptions']}>
                <FooterNavigation />
            </MemoryRouter>
        );


        expect(screen.getByLabelText('Мои подписки')).toHaveStyle('color: #9DB2CE');
        expect(screen.getByLabelText('Библиотека')).toHaveStyle('color: #1976D2');
        expect(screen.getByLabelText('Мой аккаунт')).toHaveStyle('color: #9DB2CE');
    });});
