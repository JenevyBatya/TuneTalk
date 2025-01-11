import { render, screen, fireEvent } from '@testing-library/react';
import Library from './Library';
import { BrowserRouter as Router } from 'react-router-dom';

// Мокаем зависимые компоненты
jest.mock('../components/CustomCard', () => () => <div>CustomCard</div>);
jest.mock('../components/SearchFilter', () => ({ onSearch }) => (
    <button onClick={() => onSearch([])}>Search</button>
));
jest.mock('../components/CategoryFilter', () => ({ onFilter }) => (
    <button onClick={() => onFilter([])}>Filter</button>
));
jest.mock('../components/FooterComponent', () => () => <div>FooterNavigation</div>);
jest.mock('../components/HeaderComponent', () => () => <div>HeaderComponent</div>);

describe('Library Component', () => {
    it('should render the library title and subtitle', () => {
        render(
            <Router>
                <Library />
            </Router>
        );

        // Проверка отображения заголовков
        expect(screen.getByText(/Library/i)).toBeInTheDocument();
        expect(screen.getByText(/библиотека/i)).toBeInTheDocument();
    });

    it('should render CustomCard components based on filtered data', () => {
        render(
            <Router>
                <Library />
            </Router>
        );

        // Проверка наличия CustomCard
        expect(screen.getAllByText('CustomCard').length).toBe(2);
    });

    it('should show no data message if filtered data is empty', () => {
        render(
            <Router>
                <Library />
            </Router>
        );

        // Клик по фильтру, чтобы очистить данные
        fireEvent.click(screen.getByText('Filter'));

        // Проверка отображения текста "Кажется, пока что у нас такого нет..."
        expect(screen.getByText('Кажется, пока что у нас такого нет...')).toBeInTheDocument();
    });

    it('should call handleFilterData when category filter is applied', () => {
        render(
            <Router>
                <Library />
            </Router>
        );

        // Получаем кнопку фильтра
        const filterButton = screen.getByText('Filter');

        // Проверяем, что фильтр вызывает handleFilterData
        fireEvent.click(filterButton);
        expect(screen.queryByText('CustomCard')).toBeNull();
        expect(screen.getByText('Кажется, пока что у нас такого нет...')).toBeInTheDocument();
    });

    it('should call setFilteredData when search filter is applied', () => {
        render(
            <Router>
                <Library />
            </Router>
        );

        // Получаем кнопку поиска
        const searchButton = screen.getByText('Search');

        // Проверяем, что кнопка поиска вызывает setFilteredData
        fireEvent.click(searchButton);
        expect(screen.queryByText('CustomCard')).toBeNull();
        expect(screen.getByText('Кажется, пока что у нас такого нет...')).toBeInTheDocument();
    });
});
