import { render, screen, waitFor } from '@testing-library/react';
import AudioPodcastPage from './AudioPodcastPage';
import '@testing-library/jest-dom';
import { useSelector } from 'react-redux';

jest.mock('../components/AudioPlayer', () => () => <div>AudioPlayer</div>);
jest.mock('../components/Comments', () => () => <div>Comments</div>);
jest.mock('../components/FooterComponent', () => () => <div>FooterNavigation</div>);
jest.mock('../components/HeaderComponent', () => () => <div>HeaderComponent</div>);
jest.mock('../components/ButtonForSubscribe', () => () => <div>SubscribeButton</div>);

const mockPodcastData = {
    audioSrc: 'mockAudio.mp3',
    name: 'Name',
    description: 'Description...',
    author: 'Альфа-Банк',
    subscribers: 123,
    tags: ['tag1', 'tag2', 'tag3'],
    duration: '21:02',
    cardPhoto: 'cardPhoto.svg',
    likes: 233,
};

const mockComments = [
    { id: 1, author: 'Иван', text: 'Очень полезный выпуск, спасибо!' },
    { id: 2, author: 'Мария', text: 'Здорово' },
];

describe('AudioPodcastPage', () => {

    it('должна отображать кнопку подписки', async () => {
        render(<AudioPodcastPage />);

        await waitFor(() => {
            expect(screen.getByText('SubscribeButton')).toBeInTheDocument();
        });
    });

    it('должна отображать FooterNavigation', async () => {
        render(<AudioPodcastPage />);

        await waitFor(() => {
            expect(screen.getByText('FooterNavigation')).toBeInTheDocument();
        });
    });
});
