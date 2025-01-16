import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MobileHeader from './HeaderComponent';

describe('MobileHeader Component', () => {
    test('renders the header with a logo', () => {
        render(
            <MemoryRouter>
                <MobileHeader />
            </MemoryRouter>
        );


        const logo = screen.getByAltText('Логотип');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', expect.stringContaining('Logo.svg'));
    });

    test('header has correct styles', () => {
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
