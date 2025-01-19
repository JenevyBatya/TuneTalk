import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
    PageContainer,
    VideoContainer,
    InfoContainer,
    Title,
    Stats,
    Tags,
    Tag,
    ActionsContainer,
    SubscribeButton,
    AddToPlaylistButton,
    CommentSection,
    CommentInput,
} from './VideoPlayerPageStyles';

describe('Тесты для стилизованных компонентов', () => {
    test('PageContainer отображается с ожидаемыми стилями', () => {
        render(<PageContainer>Page Content</PageContainer>);
        const container = screen.getByText('Page Content');
        expect(container).toHaveStyle(`
      display: flex;
      flex-direction: column;
      color: #fff;
      height: 100vh;
      overflow-y: auto;
    `);
    });

    test('VideoContainer имеет ожидаемые стили', () => {
        render(<VideoContainer>Video Content</VideoContainer>);
        const videoContainer = screen.getByText('Video Content');
        expect(videoContainer).toHaveStyle(`
      width: 100%;
      max-width: 600px;
      position: relative;
    `);
    });

    test('InfoContainer отображается с фоном и отступами', () => {
        render(<InfoContainer>Info Content</InfoContainer>);
        const infoContainer = screen.getByText('Info Content');
        expect(infoContainer).toHaveStyle(`
      background: #1e1e1e;
      padding: 10px;
      border-radius: 10px;
      margin-top: 10px;
    `);
    });

    test('Title отображается с правильным размером шрифта', () => {
        render(<Title>Video Title</Title>);
        const title = screen.getByText('Video Title');
        expect(title).toHaveStyle('font-size: 18px; margin: 0 0 5px;');
    });

    test('Stats отображаются с правильным цветом и размером шрифта', () => {
        render(<Stats>Video Stats</Stats>);
        const stats = screen.getByText('Video Stats');
        expect(stats).toHaveStyle('font-size: 14px; color: #aaa; margin: 5px 0;');
    });

    test('Tags и Tag отображаются с ожидаемыми стилями', () => {
        render(
            <Tags>
                <Tag>#Tag1</Tag>
                <Tag>#Tag2</Tag>
            </Tags>
        );
        const tag1 = screen.getByText('#Tag1');
        const tag2 = screen.getByText('#Tag2');
        expect(tag1).toHaveStyle('color: #ffa500; font-size: 12px; margin-right: 10px;');
        expect(tag2).toHaveStyle('color: #ffa500; font-size: 12px; margin-right: 10px;');
    });

    test('ActionsContainer выравнивает элементы правильно', () => {
        render(<ActionsContainer>Actions Content</ActionsContainer>);
        const actions = screen.getByText('Actions Content');
        expect(actions).toHaveStyle('display: flex; align-items: center; justify-content: space-between;');
    });

    test('SubscribeButton отображается с правильными стилями', () => {
        render(<SubscribeButton>Subscribe</SubscribeButton>);
        const button = screen.getByText('Subscribe');
        expect(button).toHaveStyle(`
      background-color: #173e47;
      color: #fff;
      border: none;
      border-radius: 5px;
      padding: 5px 10px;
      font-size: 14px;
    `);
    });

    test('CommentSection и CommentInput отображаются с ожидаемыми стилями', () => {
        render(
            <CommentSection>
                <CommentInput placeholder="Write a comment..." />
            </CommentSection>
        );
        const section = screen.getByPlaceholderText('Write a comment...');
        expect(section).toHaveStyle(`
      width: 100%;
      background-color: #333;
      color: #fff;
      border: none;
      border-radius: 5px;
      padding: 10px;
      resize: none;
    `);
    });
});
