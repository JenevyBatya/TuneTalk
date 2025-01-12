import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Sections from './Sections';

describe('Sections Component', () => {
    let setActiveSectionMock;

    beforeEach(() => {
        setActiveSectionMock = jest.fn();
    });

    it('renders all section buttons with correct labels', () => {
        const { getByText, getByAltText } = render(<Sections setActiveSection={setActiveSectionMock} />);

        expect(getByText('Подкасты')).toBeInTheDocument();
        expect(getByText('Плейлисты')).toBeInTheDocument();
        expect(getByAltText('Избранное')).toBeInTheDocument();
        expect(getByAltText('Сохраненное')).toBeInTheDocument();
    });

    it('applies "active" styles to the first section by default', () => {
        const { getByText } = render(<Sections setActiveSection={setActiveSectionMock} />);

        const podcastsButton = getByText('Подкасты').closest('div');
        expect(podcastsButton).toHaveStyle('background: #FF7510');

    });

    it('updates active section and calls setActiveSection on button click', () => {
        const { getByText } = render(<Sections setActiveSection={setActiveSectionMock} />);

        const playlistsButton = getByText('Плейлисты').closest('div');
        fireEvent.click(playlistsButton);

        expect(setActiveSectionMock).toHaveBeenCalledWith(1);
        expect(playlistsButton).toHaveStyle('background: #FF7510');
    });

    it('highlights the correct section on click', () => {
        const { getByText } = render(<Sections setActiveSection={setActiveSectionMock} />);

        const podcastsButton = getByText('Подкасты').closest('div');
        const playlistsButton = getByText('Плейлисты').closest('div');


        expect(podcastsButton).toHaveStyle('background: #FF7510');
        expect(playlistsButton).toHaveStyle('background: white');


        fireEvent.click(playlistsButton);


        expect(podcastsButton).toHaveStyle('background: white');
        expect(playlistsButton).toHaveStyle('background: #FF7510');
    });

    it('calls setActiveSection with the correct index for icon sections', () => {
        const { getByAltText } = render(<Sections setActiveSection={setActiveSectionMock} />);

        const likedIconButton = getByAltText('Избранное').closest('div');
        const savedIconButton = getByAltText('Сохраненное').closest('div');

        fireEvent.click(likedIconButton);
        expect(setActiveSectionMock).toHaveBeenCalledWith(2);

        fireEvent.click(savedIconButton);
        expect(setActiveSectionMock).toHaveBeenCalledWith(3);
    });
});
