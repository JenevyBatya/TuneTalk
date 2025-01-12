import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './LandingPage';
import Slider from 'react-slick';
import { axe, toHaveNoViolations } from 'jest-axe';


jest.mock('../components/FooterComponent', () => () => <div>Footer</div>);
jest.mock('../components/HeaderComponent', () => () => <div>Header</div>);
jest.mock('react-slick', () => ({ children }) => <div>{children}</div>);

expect.extend(toHaveNoViolations);

describe('LandingPage Component', () => {
    it('renders the header component', () => {
        render(
            <Router>
                <LandingPage />
            </Router>
        );
        expect(screen.getByText('Header')).toBeInTheDocument();
    });

    it('renders the registration button with correct link', () => {
        render(
            <Router>
                <LandingPage />
            </Router>
        );
        const registerButton = screen.getByRole('link', { name: 'Зарегистрироваться' });
        expect(registerButton).toHaveAttribute('href', '/Registration');
    });

    it('renders the slider with images', () => {
        render(
            <Router>
                <LandingPage />
            </Router>
        );
        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(6);
        images.forEach((image, index) => {
            expect(image).toHaveAttribute('src');
            expect(image).toHaveAttribute('alt', expect.stringMatching(/photo|auth/));
        });
    });

    it('renders the footer component', () => {
        render(
            <Router>
                <LandingPage />
            </Router>
        );
        expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('matches the snapshot', () => {
        const { asFragment } = render(
            <Router>
                <LandingPage />
            </Router>
        );
        expect(asFragment()).toMatchSnapshot();
    });


});
