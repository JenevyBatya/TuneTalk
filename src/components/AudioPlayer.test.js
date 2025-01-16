import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AudioPlayer from './AudioPlayer';
import useSound from 'use-sound';

jest.mock('use-sound');

describe('Компонент AudioPlayer', () => {
    const mockAudioSrc = 'test.mp3';
    const mockLikes = 10;
    const mockCardPhoto = 'test.jpg';
    const mockName = 'Test Audio';

    const mockPlay = jest.fn();
    const mockPause = jest.fn();
    const mockSound = {
        duration: jest.fn().mockReturnValue(120),
        seek: jest.fn().mockImplementation(() => 30),
    };

    beforeEach(() => {
        useSound.mockReturnValue([mockPlay, { pause: mockPause, sound: mockSound }]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('должен рендериться без ошибок', () => {
        render(<AudioPlayer audioSrc={mockAudioSrc} likes={mockLikes} cardPhoto={mockCardPhoto} name={mockName} />);
        expect(screen.getByText(mockName)).toBeInTheDocument();
        expect(screen.getByText(`${mockLikes}`)).toBeInTheDocument();
    });

    it('должен корректно форматировать время', () => {
        render(<AudioPlayer audioSrc={mockAudioSrc} likes={mockLikes} cardPhoto={mockCardPhoto} name={mockName} />);

        const currentTimeText = screen.getByText(/^\d+:\d+/);
        expect(currentTimeText).toBeInTheDocument();
    });

    it('должен обрабатывать ошибку, если useSound возвращает undefined', () => {
        useSound.mockReturnValueOnce(undefined);

        render(<AudioPlayer audioSrc={mockAudioSrc} likes={mockLikes} cardPhoto={mockCardPhoto} name={mockName} />);

        expect(screen.getByText(mockName)).toBeInTheDocument();
    });
});
