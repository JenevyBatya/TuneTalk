import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePage, {PlaylistCard, ButtonBeforeCards, playlists, RenderPlaylistCards} from './Profile';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../components/HeaderComponent', () => () => <div data-testid="header-component">HeaderComponent</div>);
jest.mock('../components/FooterComponent', () => () => <div data-testid="footer-component">FooterComponent</div>);
// jest.mock('../components/FooterNavigation', () => () => <div data-testid="footer-navigation">FooterNavigation</div>);

describe('ProfilePage Component', () => {
    it('renders ProfilePage correctly', () => {
        render(<ProfilePage />);

        // Header
        expect(screen.getByTestId('header-component')).toBeInTheDocument();

        // User Info
        expect(screen.getByText('Имя Фамилия')).toBeInTheDocument();
        expect(screen.getByText('Описание профиля текст текст текст')).toBeInTheDocument();
        expect(screen.getByText('vk.com/user')).toBeInTheDocument();
        expect(screen.getByText('Изменить профиль')).toBeInTheDocument();

        // Stats
        expect(screen.getByText('27 подписчиков')).toBeInTheDocument();
        expect(screen.getByText('256 подписок')).toBeInTheDocument();
        expect(screen.getByText('7 подкастов')).toBeInTheDocument();

        // Footer
        expect(screen.getByTestId('footer-component')).toBeInTheDocument();
    });
});

describe('ButtonBeforeCards Component', () => {
    it('renders ButtonBeforeCards correctly', () => {
        const { getByText } = render(<ButtonBeforeCards line="Добавить новый плейлист" />);
        expect(getByText('Добавить новый плейлист')).toBeInTheDocument();
        // expect(screen.getByTestId('footer-navigation')).toBeInTheDocument();
    });
});

describe('PlaylistCard Component', () => {
    it('renders PlaylistCard correctly', () => {
        const mockPlaylist = playlists[0];
        const { getByText, getByAltText } = render(<PlaylistCard item={mockPlaylist} />);

        expect(getByText(mockPlaylist.title)).toBeInTheDocument();
        expect(getByText('Подборка треков для продуктивной...')).toBeInTheDocument();
        expect(getByText(`${mockPlaylist.episodes} выпуска`)).toBeInTheDocument();
        expect(getByAltText('Плейлист обложка')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Слушать/i })).toBeInTheDocument();
    });

    it('переключает иконку блокировки при клике на кнопку', () => {
        const mockPlaylist = playlists[0];
        const { getByRole, queryByTestId } = render(<PlaylistCard item={mockPlaylist} />);

        const lockButton = getByRole('button');
        fireEvent.click(lockButton);

        expect(queryByTestId('lock-open-icon')).toBeInTheDocument();
        expect(queryByTestId('lock-icon')).not.toBeInTheDocument();

        fireEvent.click(lockButton);

        expect(queryByTestId('lock-icon')).toBeInTheDocument();
        expect(queryByTestId('lock-open-icon')).not.toBeInTheDocument();
    });


});

describe('RenderPlaylistCards Component', () => {
    it('renders all playlist cards correctly', () => {
        const { getAllByText } = render(<RenderPlaylistCards list={playlists} noButton={false} />);
        playlists.forEach((playlist) => {
            expect(getAllByText(playlist.title)).toBeTruthy();
        });
    });
});
