import { render, screen, fireEvent } from '@testing-library/react';
import Library from './Library';
import { BrowserRouter as Router } from 'react-router-dom';


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


        expect(screen.getByText(/Library/i)).toBeInTheDocument();
        expect(screen.getByText(/библиотека/i)).toBeInTheDocument();
    });

    it('should render CustomCard components based on filtered data', () => {
        render(
            <Router>
                <Library />
            </Router>
        );


        expect(screen.getAllByText('CustomCard').length).toBe(2);
    });

    it('should show no data message if filtered data is empty', () => {
        render(
            <Router>
                <Library />
            </Router>
        );


        fireEvent.click(screen.getByText('Filter'));


        expect(screen.getByText('Кажется, пока что у нас такого нет...')).toBeInTheDocument();
    });

    it('should call handleFilterData when category filter is applied', () => {
        render(
            <Router>
                <Library />
            </Router>
        );


        const filterButton = screen.getByText('Filter');


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


        const searchButton = screen.getByText('Search');


        fireEvent.click(searchButton);
        expect(screen.queryByText('CustomCard')).toBeNull();
        expect(screen.getByText('Кажется, пока что у нас такого нет...')).toBeInTheDocument();
    });
});
