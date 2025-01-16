import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import CategoryFilter from './CategoryFilter';

jest.mock('axios');

describe('Компонент CategoryFilter', () => {
    const onFilterMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('отображает кнопку фильтра и переключает видимость фильтра', () => {
        render(<CategoryFilter onFilter={onFilterMock} />);

        const filterButton = screen.getByRole('button', { name: /search icon/i });
        expect(filterButton).toBeInTheDocument();

        fireEvent.click(filterButton);
        expect(screen.getByText(/фильтрация/i)).toBeInTheDocument();

        fireEvent.click(filterButton);
        expect(screen.queryByText(/фильтрация/i)).not.toBeInTheDocument();
    });

    test('отображает категории и позволяет выбирать категории', () => {
        render(<CategoryFilter onFilter={onFilterMock} />);

        fireEvent.click(screen.getByRole('button', { name: /search icon/i }));
        const categoryChip = screen.getByText('Криминал');
        expect(categoryChip).toBeInTheDocument();

        fireEvent.click(categoryChip);
        fireEvent.click(categoryChip);
    });

    test('отображает параметры сортировки и меняет выбранный порядок сортировки', () => {
        render(<CategoryFilter onFilter={onFilterMock} />);

        fireEvent.click(screen.getByRole('button', { name: /search icon/i }));

        const relevanceOption = screen.getByLabelText('По релевантности');
        expect(relevanceOption).toBeInTheDocument();

        fireEvent.click(relevanceOption);
        expect(relevanceOption).toBeChecked();
    });

    test('отображает слайдер продолжительности и изменяет его значение', () => {
        render(<CategoryFilter onFilter={onFilterMock} />);

        fireEvent.click(screen.getByRole('button', { name: /search icon/i }));

        const sliders = screen.getAllByRole('slider');
        expect(sliders.length).toBeGreaterThan(0);

        const slider = sliders[0];
        expect(slider).toBeInTheDocument();
        fireEvent.change(slider, { target: { value: 30 } });
        expect(slider.value).toBe('30');
    });

    test('применяет фильтры и отправляет данные на сервер', async () => {
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

    test('обрабатывает ошибку сервера при применении фильтров', async () => {
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
