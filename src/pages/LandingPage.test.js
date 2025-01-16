import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';

// Импортируем стили и мокируем их
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

// Убедимся, что реальный Slider используется
jest.unmock('react-slick');
jest.mock('react-slick', () => {
    return ({ children }) => <div>{children}</div>;
});

describe('LandingPage Component', () => {
    test('Рендеринг заголовков, текста и кнопок', () => {
        render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>
        );

        // Проверяем наличие заголовков и текста
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

        // Проверяем наличие кнопки "Зарегистрироваться"
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

        // Проверяем, что первое изображение появляется в слайдере
        await waitFor(() => {
            expect(screen.getByAltText(/photo 1/i)).toBeInTheDocument();
        });

        // Проверяем остальные изображения в первом слайдере
        expect(screen.getByAltText(/photo 2/i)).toBeInTheDocument();
        expect(screen.getByAltText(/photo 3/i)).toBeInTheDocument();

        // Проверяем изображения авторов во втором слайдере
        expect(screen.getByAltText(/auth 1/i)).toBeInTheDocument();
        expect(screen.getByAltText(/auth 2/i)).toBeInTheDocument();
        expect(screen.getByAltText(/auth 3/i)).toBeInTheDocument();
    });
});
