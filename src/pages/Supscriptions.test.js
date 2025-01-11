import { render, screen, fireEvent } from '@testing-library/react';
import Subscriptions from './Subscriptions';
import { BrowserRouter as Router } from 'react-router-dom';

// Мокаем зависимые компоненты
jest.mock('../components/CustomCard', () => () => <div>CustomCard</div>);
jest.mock('../components/CategoryFilter', () => ({ onFilter }) => (
    <button onClick={() => onFilter([])}>Filter</button>
));
jest.mock('../components/FooterComponent', () => () => <div>FooterNavigation</div>);
jest.mock('../components/HeaderComponent', () => () => <div>HeaderComponent</div>);

describe('Subscriptions Component', () => {
    it('should render the subscriptions title and subtitle', () => {
        render(
            <Router>
                <Subscriptions />
            </Router>
        );

        // Проверка отображения заголовков
        expect(screen.getByText(/Subscriptions/i)).toBeInTheDocument();
        expect(screen.getByText(/подписки/i)).toBeInTheDocument();
    });

    it('should render CustomCard components based on filtered data', () => {
        render(
            <Router>
                <Subscriptions />
            </Router>
        );

        // Проверка наличия CustomCard
        expect(screen.getAllByText('CustomCard').length).toBe(2);
    });

    it('should show no content message if filtered data is empty', () => {
        render(
            <Router>
                <Subscriptions />
            </Router>
        );

        // Клик по фильтру, чтобы очистить данные
        fireEvent.click(screen.getByText('Filter'));

        // Проверка отображения текста "Кажется, пока что у нас такого нет..."
        expect(screen.getByText('Кажется, пока что у нас такого нет...')).toBeInTheDocument();
    });

    it('should call handleFilterData when filter is applied', () => {
        render(
            <Router>
                <Subscriptions />
            </Router>
        );

        // Получаем кнопку фильтра
        const filterButton = screen.getByText('Filter');

        // Проверяем, что фильтр вызывает handleFilterData
        fireEvent.click(filterButton);
        expect(screen.queryByText('CustomCard')).toBeNull();
        expect(screen.getByText('Кажется, пока что у нас такого нет...')).toBeInTheDocument();
    });
});
