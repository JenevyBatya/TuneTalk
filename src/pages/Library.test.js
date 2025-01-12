import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Library from '../pages/Library';

jest.mock('../components/HeaderComponent', () => () => <div>HeaderComponent</div>);
jest.mock('../components/FooterComponent', () => () => <div>FooterNavigation</div>);
jest.mock('../components/SearchFilter', () => ({ onSearch }) => (
    <input
        data-testid="search-input"
        onChange={(e) => onSearch([{ id: 1, name: 'Filtered Name', description: 'Filtered Desc', author: 'Filtered Author' }])}
        placeholder="Search"
    />
));
jest.mock('../components/CategoryFilter', () => ({ onFilter }) => (
    <button data-testid="category-filter" onClick={() => onFilter([{ id: 2, name: 'Category Name', description: 'Category Desc', author: 'Category Author' }])}>
        Apply Filter
    </button>
));
jest.mock('../components/CustomCard', () => ({ name }) => <div>{name}</div>);

jest.mock('../pages/Library', () => {
    const originalModule = jest.requireActual('../pages/Library');
    return {
        ...originalModule,
        fetchData: jest.fn(async (page) => {
            const mockData = Array.from({ length: 10 }, (_, i) => ({
                id: i + 1 + (page - 1) * 10,
                name: `Mock Name ${i + 1}`,
                description: `Mock Description ${i + 1}`,
                author: `Mock Author ${i + 1}`,
                subscribes: i + 1,
                tags: [],
                duration: '60 min',
                photo: 'mockPhoto',
            }));
            return mockData;
        }),
    };
});

describe('Library Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders Library component without crashing', async () => {
        render(<Library />);
        expect(screen.getByText(/HeaderComponent/i)).toBeInTheDocument();
        expect(screen.getByText(/FooterNavigation/i)).toBeInTheDocument();
        expect(screen.getByText(/Library/i)).toBeInTheDocument();
    });

    test('loads and displays initial data', async () => {
        render(<Library />);
        await waitFor(() => {
            expect(screen.getByText(/Mock Name 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Mock Name 10/i)).toBeInTheDocument();
        });
    });

    test('filters data with SearchFilter', async () => {
        render(<Library />);
        const searchInput = screen.getByTestId('search-input');

        fireEvent.change(searchInput, { target: { value: 'Filter' } });

        await waitFor(() => {
            expect(screen.getByText(/Filtered Name/i)).toBeInTheDocument();
            expect(screen.queryByText(/Mock Name 1/i)).not.toBeInTheDocument();
        });
    });

    test('applies category filter', async () => {
        render(<Library />);
        const filterButton = screen.getByTestId('category-filter');

        fireEvent.click(filterButton);

        await waitFor(() => {
            expect(screen.getByText(/Category Name/i)).toBeInTheDocument();
            expect(screen.queryByText(/Mock Name 1/i)).not.toBeInTheDocument();
        });
    });

    test('loads more data when "Загрузить ещё" is clicked', async () => {
        render(<Library />);
        await waitFor(() => {
            expect(screen.getByText(/Mock Name 10/i)).toBeInTheDocument();
        });

        const loadMoreButton = screen.getByText(/Загрузить ещё/i);
        fireEvent.click(loadMoreButton);

        await waitFor(() => {
            expect(screen.getByText(/Mock Name 11/i)).toBeInTheDocument();
            expect(screen.getByText(/Mock Name 20/i)).toBeInTheDocument();
        });
    });

    test('displays message when no data is found', async () => {
        jest.spyOn(require('../pages/Library'), 'fetchData').mockResolvedValue([]);
        render(<Library />);
        await waitFor(() => {
            expect(screen.getByText(/Кажется, пока что у нас такого нет/i)).toBeInTheDocument();
        });
    });
});
