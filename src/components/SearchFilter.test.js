import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import SearchFilter from './SearchFilter';

describe('SearchFilter Component', () => {
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

    test('should render SearchFilter component correctly', () => {
        render(<SearchFilter data={data} searchFields={searchFields} onSearch={mockOnSearch} />);

        // Проверка наличия текстового поля и иконки поиска
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByAltText('search icon')).toBeInTheDocument();
    });

    test('should filter data correctly based on search query', () => {
        render(<SearchFilter data={data} searchFields={searchFields} onSearch={mockOnSearch} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'john' } });

        // Проверка, что фильтрация работает
        expect(mockOnSearch).toHaveBeenCalledWith([
            { name: 'John Doe', email: 'john@example.com' },
            { name: 'Sam Johnson', email: 'sam@example.com' },
        ]);
    });

    test('should not filter data if no query is provided', () => {
        render(<SearchFilter data={data} searchFields={searchFields} onSearch={mockOnSearch} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: '' } });

        // Проверка, что все данные передаются обратно без изменений
        expect(mockOnSearch).toHaveBeenCalledWith(data);
    });

    test('should call onSearch function when data is filtered', () => {
        render(<SearchFilter data={data} searchFields={searchFields} onSearch={mockOnSearch} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'jane' } });

        // Проверка, что onSearch вызывается с отфильтрованными данными
        expect(mockOnSearch).toHaveBeenCalledWith([
            { name: 'Jane Smith', email: 'jane@example.com' },
        ]);
    });

    test('should handle data with no matching search fields', () => {
        render(<SearchFilter data={data} searchFields={['phone']} onSearch={mockOnSearch} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: '123' } });

        // Проверка, что onSearch вызывается с пустым массивом (ничего не найдено)
        expect(mockOnSearch).toHaveBeenCalledWith([]);
    });
});
