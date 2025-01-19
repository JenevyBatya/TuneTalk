import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import SearchFilter from './SearchFilter';

describe('Компонент SearchFilter', () => {
    const mockOnSearch = jest.fn();

    const data = [
        { name: 'John Doe', email: 'john@example.com' },
        { name: 'Jane Smith', email: 'jane@example.com' },
        { name: 'Sam Johnson', email: 'sam@example.com' },
    ];

    const searchFields = ['name', 'email'];

    afterEach(() => {
        cleanup();
        mockOnSearch.mockClear();
    });

    test('Отображение компонента SearchFilter', () => {
        render(<SearchFilter data={data} searchFields={searchFields} onSearch={mockOnSearch} />);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByAltText('search icon')).toBeInTheDocument();
    });

    test('Фильтрация данных по запросу', () => {
        render(<SearchFilter data={data} searchFields={searchFields} onSearch={mockOnSearch} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'john' } });

        expect(mockOnSearch).toHaveBeenCalledWith([
            { name: 'John Doe', email: 'john@example.com' },
            { name: 'Sam Johnson', email: 'sam@example.com' },
        ]);
    });

    test('Отсутствие фильтрации данных без запроса', () => {
        render(<SearchFilter data={data} searchFields={searchFields} onSearch={mockOnSearch} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: '' } });

        expect(mockOnSearch).toHaveBeenCalledWith(data);
    });

    test('Вызов функции onSearch при фильтрации данных', () => {
        render(<SearchFilter data={data} searchFields={searchFields} onSearch={mockOnSearch} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'jane' } });

        expect(mockOnSearch).toHaveBeenCalledWith([
            { name: 'Jane Smith', email: 'jane@example.com' },
        ]);
    });

    test('Обработка данных без соответствующих полей для поиска', () => {
        render(<SearchFilter data={data} searchFields={['phone']} onSearch={mockOnSearch} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: '123' } });

        expect(mockOnSearch).toHaveBeenCalledWith([]);
    });
});
