import { render, screen } from '@testing-library/react';
import CustomCard from './CustomCard';

describe('CustomCard Component', () => {
    const mockProps = {
        name: 'Test Podcast',
        description: 'This is a test podcast description.',
        tags: [{ text: 'React' }, { text: 'JavaScript' }],
        duration: '15 min',
        author: 'John Doe',
        subscribers: 123,
        cardPhoto: 'test-image.jpg',
    };

    test('should render the card with all the necessary elements', () => {
        render(<CustomCard {...mockProps} />);

        // Проверка отображения названия
        expect(screen.getByText(mockProps.name)).toBeInTheDocument();

        // Проверка отображения описания
        expect(screen.getByText(mockProps.description)).toBeInTheDocument();

        // Проверка отображения времени
        expect(screen.getByText(mockProps.duration)).toBeInTheDocument();

        // Проверка отображения автора
        expect(screen.getByText(mockProps.author)).toBeInTheDocument();

        // Проверка отображения количества подписчиков
        expect(screen.getByText(`${mockProps.subscribers} подписчиков`)).toBeInTheDocument();
    });

    test('should render tags correctly', () => {
        render(<CustomCard {...mockProps} />);

        // Проверка на отображение каждого тега
        mockProps.tags.forEach((tag) => {
            expect(screen.getByText(`#${tag.text}`)).toBeInTheDocument();
        });
    });

    test('should render the image correctly', () => {
        render(<CustomCard {...mockProps} />);

        // Проверка на наличие изображения
        const image = screen.getByAltText('Podcast');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', mockProps.cardPhoto);
    });

    test('should render "Слушать" button', () => {
        render(<CustomCard {...mockProps} />);

        // Проверка кнопки "Слушать"
        const button = screen.getByText('Слушать');
        expect(button).toBeInTheDocument();
    });

    test('should render correctly with no tags', () => {
        const propsWithoutTags = { ...mockProps, tags: [] };
        render(<CustomCard {...propsWithoutTags} />);

        // Проверка, что никаких тегов не отображается
        expect(screen.queryByTestId('tags')).not.toBeInTheDocument();
    });
});
