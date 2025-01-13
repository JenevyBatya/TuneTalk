import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AudioPlayer from './AudioPlayer';
import useSound from 'use-sound';

// Мокаем use-sound
jest.mock('use-sound');

describe('AudioPlayer Component', () => {
    const mockAudioSrc = 'test.mp3';
    const mockLikes = 10;
    const mockCardPhoto = 'test.jpg';
    const mockName = 'Test Audio';

    // Мокаем возвращаемое значение use-sound
    const mockPlay = jest.fn();
    const mockPause = jest.fn();
    const mockSound = {
        duration: jest.fn().mockReturnValue(120), // продолжительность в секундах
        seek: jest.fn().mockImplementation(() => 30), // возвращаем текущую позицию
    };

    beforeEach(() => {
        useSound.mockReturnValue([mockPlay, { pause: mockPause, sound: mockSound }]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render without crashing', () => {
        render(<AudioPlayer audioSrc={mockAudioSrc} likes={mockLikes} cardPhoto={mockCardPhoto} name={mockName} />);
        expect(screen.getByText(mockName)).toBeInTheDocument();
        expect(screen.getByText(`${mockLikes}`)).toBeInTheDocument();
    });



    it('should format time correctly', () => {
        render(<AudioPlayer audioSrc={mockAudioSrc} likes={mockLikes} cardPhoto={mockCardPhoto} name={mockName} />);

        const currentTimeText = screen.getByText(/^\d+:\d+/); // Текст времени, например, 1:30
        expect(currentTimeText).toBeInTheDocument();
    });

    it('should handle error if useSound returns undefined', () => {
        useSound.mockReturnValueOnce(undefined);

        render(<AudioPlayer audioSrc={mockAudioSrc} likes={mockLikes} cardPhoto={mockCardPhoto} name={mockName} />);

        // Проверяем, что ошибки не возникло (по сути, компонент не ломается)
        expect(screen.getByText(mockName)).toBeInTheDocument();
    });
});
