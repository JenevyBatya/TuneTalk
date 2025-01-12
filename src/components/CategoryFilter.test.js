import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import CategoryFilter from './CategoryFilter';

jest.mock('axios');

describe('CategoryFilter Component', () => {
    const onFilterMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders filter button and toggles filter visibility', () => {
        render(<CategoryFilter onFilter={onFilterMock} />);

        const filterButton = screen.getByRole('button', { name: /search icon/i });
        expect(filterButton).toBeInTheDocument();

        fireEvent.click(filterButton);
        expect(screen.getByText(/фильтрация/i)).toBeInTheDocument();

        fireEvent.click(filterButton);
        expect(screen.queryByText(/фильтрация/i)).not.toBeInTheDocument();
    });

    test('renders categories and allows category selection', () => {
        render(<CategoryFilter onFilter={onFilterMock} />);

        fireEvent.click(screen.getByRole('button', { name: /search icon/i }));
        const categoryChip = screen.getByText('Криминал');
        expect(categoryChip).toBeInTheDocument();

        fireEvent.click(categoryChip);
        fireEvent.click(categoryChip);
    });

    test('renders sorting options and changes selected sort order', () => {
        render(<CategoryFilter onFilter={onFilterMock} />);

        fireEvent.click(screen.getByRole('button', { name: /search icon/i }));

        const relevanceOption = screen.getByLabelText('По релевантности');
        expect(relevanceOption).toBeInTheDocument();

        fireEvent.click(relevanceOption);
        expect(relevanceOption).toBeChecked();
    });

    test('renders duration slider and changes its value', () => {
        render(<CategoryFilter onFilter={onFilterMock} />);

        fireEvent.click(screen.getByRole('button', { name: /search icon/i }));

        const sliders = screen.getAllByRole('slider');
        expect(sliders.length).toBeGreaterThan(0);

        const slider = sliders[0];
        expect(slider).toBeInTheDocument();
        fireEvent.change(slider, { target: { value: 30 } });
        expect(slider.value).toBe('30');
    });


    test('applies filters and sends data to the server', async () => {
        axios.post.mockResolvedValue({ data: { success: true } });
        render(<CategoryFilter onFilter={onFilterMock} />);

        fireEvent.click(screen.getByRole('button', { name: /search icon/i }));
        const applyButton = screen.getByText('Применить фильтры');
        fireEvent.click(applyButton);

        expect(axios.post).toHaveBeenCalledWith('/api/filter', {
            duration: [15, 40],
            sortOrder: 'date',
            categories: ['Образование', 'Воспитание'],
        });

        await screen.findByText('Применить фильтры');
        expect(onFilterMock).not.toHaveBeenCalled();
    });

    test('handles server error when applying filters', async () => {
        axios.post.mockRejectedValue(new Error('Server error'));
        render(<CategoryFilter onFilter={onFilterMock} />);

        fireEvent.click(screen.getByRole('button', { name: /search icon/i }));

        const applyButton = screen.getByText('Применить фильтры');
        fireEvent.click(applyButton);

        expect(axios.post).toHaveBeenCalled();
        await screen.findByText('Применить фильтры');
        expect(onFilterMock).not.toHaveBeenCalled();
    });
});
