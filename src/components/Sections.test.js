import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Sections from './Sections';

describe('Компонент Sections', () => {
    let setActiveSectionMock;

    beforeEach(() => {
        setActiveSectionMock = jest.fn();
    });

    it('Отображение всех кнопок секций с правильными метками', () => {
        const { getByText, getByAltText } = render(<Sections setActiveSection={setActiveSectionMock} />);

        expect(getByText('Подкасты')).toBeInTheDocument();
        expect(getByText('Плейлисты')).toBeInTheDocument();
        expect(getByAltText('Избранное')).toBeInTheDocument();
        expect(getByAltText('Сохраненное')).toBeInTheDocument();
    });

    it('Применение стилей "активный" к первой секции по умолчанию', () => {
        const { getByText } = render(<Sections setActiveSection={setActiveSectionMock} />);

        const podcastsButton = getByText('Подкасты').closest('div');
        expect(podcastsButton).toHaveStyle('background: #FF7510');
    });

    it('Обновление активной секции и вызов setActiveSection при клике на кнопку', () => {
        const { getByText } = render(<Sections setActiveSection={setActiveSectionMock} />);

        const playlistsButton = getByText('Плейлисты').closest('div');
        fireEvent.click(playlistsButton);

        expect(setActiveSectionMock).toHaveBeenCalledWith(1);
        expect(playlistsButton).toHaveStyle('background: #FF7510');
    });

    it('Подсветка корректной секции при клике', () => {
        const { getByText } = render(<Sections setActiveSection={setActiveSectionMock} />);

        const podcastsButton = getByText('Подкасты').closest('div');
        const playlistsButton = getByText('Плейлисты').closest('div');

        expect(podcastsButton).toHaveStyle('background: #FF7510');
        expect(playlistsButton).toHaveStyle('background: white');

        fireEvent.click(playlistsButton);

        expect(podcastsButton).toHaveStyle('background: white');
        expect(playlistsButton).toHaveStyle('background: #FF7510');
    });

    it('Вызов setActiveSection с корректным индексом для секций-иконок', () => {
        const { getByAltText } = render(<Sections setActiveSection={setActiveSectionMock} />);

        const likedIconButton = getByAltText('Избранное').closest('div');
        const savedIconButton = getByAltText('Сохраненное').closest('div');

        fireEvent.click(likedIconButton);
        expect(setActiveSectionMock).toHaveBeenCalledWith(2);

        fireEvent.click(savedIconButton);
        expect(setActiveSectionMock).toHaveBeenCalledWith(3);
    });
});
