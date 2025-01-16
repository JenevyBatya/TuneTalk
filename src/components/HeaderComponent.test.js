import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MobileHeader from './HeaderComponent';

describe('Компонент MobileHeader', () => {
    test('Отображение заголовка с логотипом', () => {
        render(
            <MemoryRouter>
                <MobileHeader />
            </MemoryRouter>
        );

        const logo = screen.getByAltText('Логотип');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', expect.stringContaining('Logo.svg'));
    });

    test('Правильные стили у заголовка', () => {
        render(
            <MemoryRouter>
                <MobileHeader />
            </MemoryRouter>
        );

        const header = screen.getByRole('banner');
        expect(header).toHaveStyle('background-color: #AECBC9');
        expect(header).toHaveStyle('position: sticky');
    });
});
