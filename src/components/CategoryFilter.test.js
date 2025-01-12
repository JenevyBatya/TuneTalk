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

        // Open filters
        fireEvent.click(filterButton);
        expect(screen.getByText(/фильтрация/i)).toBeInTheDocument();

        // Close filters
        fireEvent.click(filterButton);
        expect(screen.queryByText(/фильтрация/i)).not.toBeInTheDocument();
    });

    test('renders categories and allows category selection', () => {
        render(<CategoryFilter onFilter={onFilterMock} />);

        fireEvent.click(screen.getByRole('button', { name: /search icon/i }));
        const categoryChip = screen.getByText('Криминал');
        expect(categoryChip).toBeInTheDocument();

        // Select a category
        fireEvent.click(categoryChip);
        // expect(categoryChip).toHaveStyle('background-color: #D4FF00');

        // Deselect the category
        fireEvent.click(categoryChip);
        // expect(categoryChip).toHaveStyle('background-color: #E5E5E5');
    });

    test('renders sorting options and changes selected sort order', () => {
        render(<CategoryFilter onFilter={onFilterMock} />);

        fireEvent.click(screen.getByRole('button', { name: /search icon/i }));

        const relevanceOption = screen.getByLabelText('По релевантности');
        expect(relevanceOption).toBeInTheDocument();

        // Change sort order
        fireEvent.click(relevanceOption);
        expect(relevanceOption).toBeChecked();
    });

    test('renders duration slider and changes its value', () => {
        render(<CategoryFilter onFilter={onFilterMock} />);

        // Открытие фильтра
        fireEvent.click(screen.getByRole('button', { name: /search icon/i }));

        // Получаем все элементы с ролью "slider"
        const sliders = screen.getAllByRole('slider');
        expect(sliders.length).toBeGreaterThan(0);

        // Берем первый слайдер (или по конкретному индексу/атрибуту, если он уникален)
        const slider = sliders[0]; // например, это слайдер с `data-index="0"`
        expect(slider).toBeInTheDocument();

        // Изменение значения слайдера
        fireEvent.change(slider, { target: { value: 30 } });

        // Проверяем новое значение
        expect(slider.value).toBe('30');
    });


    test('applies filters and sends data to the server', async () => {
        axios.post.mockResolvedValue({ data: { success: true } });
        render(<CategoryFilter onFilter={onFilterMock} />);

        fireEvent.click(screen.getByRole('button', { name: /search icon/i }));

        // Apply filters
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

        // Apply filters
        const applyButton = screen.getByText('Применить фильтры');
        fireEvent.click(applyButton);

        expect(axios.post).toHaveBeenCalled();
        await screen.findByText('Применить фильтры'); // Wait for async operation
        expect(onFilterMock).not.toHaveBeenCalled();
    });
});
