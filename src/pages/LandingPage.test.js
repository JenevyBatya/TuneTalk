import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';

jest.mock('../styles/LandingPageStyles', () => ({
    HeadingText1: 'h1',
    HeadingText2: 'h2',
    MainContainer: 'div',
    RecBlock: 'div',
    RegBlock: 'div',
    StyledButton: 'button',
    Text2: 'p',
    Text1: 'p',
    HeaderBlock: 'div',
    PhotoDiv: 'div',
    Photo: 'img',
    RecommendDiv: 'div',
}));

jest.unmock('react-slick');
jest.mock('react-slick', () => {
    return ({ children }) => <div>{children}</div>;
});

describe('Компонент LandingPage', () => {
    test('Рендеринг заголовков, текста и кнопок', () => {
        render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>
        );

        expect(screen.getByText(/Хостинг подкастов/i)).toBeInTheDocument();
        expect(
            screen.getByText(
                /Все русскоязычные подкасты на одной платформе/i
            )
        ).toBeInTheDocument();
        expect(
            screen.getByText(/Любимые авторы в одном месте/i)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/Мы собрали всех ваших любимых авторов/i)
        ).toBeInTheDocument();

        expect(
            screen.getByRole('button', { name: /Зарегистрироваться/i })
        ).toBeInTheDocument();
    });

    test('Слайды с изображениями рендерятся корректно', async () => {
        render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByAltText(/photo 1/i)).toBeInTheDocument();
        });

        expect(screen.getByAltText(/photo 2/i)).toBeInTheDocument();
        expect(screen.getByAltText(/photo 3/i)).toBeInTheDocument();
        expect(screen.getByAltText(/auth 1/i)).toBeInTheDocument();
        expect(screen.getByAltText(/auth 2/i)).toBeInTheDocument();
        expect(screen.getByAltText(/auth 3/i)).toBeInTheDocument();
    });
});
