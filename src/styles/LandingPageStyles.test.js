import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
    MainContainer,
    Header,
    RecBlock,
    HeadingText1,
    HeadingText2,
    Text1,
    Text2,
    PhotoDiv,
    Photo,
    StyledButton,
    RegBlock,
    RecommendDiv,
} from './LandingPageStyles';

describe('Styled Components', () => {
    test('MainContainer renders correctly with the expected styles', () => {
        const { getByText } = render(<MainContainer>Main Container Content</MainContainer>);
        const container = getByText('Main Container Content');
        expect(container).toHaveStyle(`
      background-color: #AECBC9;
      border-radius: 8px;
      color: white;
    `);
    });

    test('Header renders with sticky position and correct background color', () => {
        const { getByText } = render(<Header>Header Content</Header>);
        const header = getByText('Header Content');
        expect(header).toHaveStyle(`
      background-color: #074753;
      position: sticky;
      top: 0;
    `);
    });


    test('RecBlock renders correctly with the expected styles', () => {
        const { getByText } = render(<RecBlock>Rec Block Content</RecBlock>);
        const block = getByText('Rec Block Content');
        expect(block).toHaveStyle(`
      background-color: #074753;
      color: white;
    `);
    });

    test('Photo renders with correct dimensions', () => {
        const { getByAltText } = render(<Photo src="test.jpg" alt="Test Image" />);
        const image = getByAltText('Test Image');
        expect(image).toHaveStyle(`
      width: 80%;
      border-radius: 20px;
    `);
    });

    test('RecommendDiv renders with correct styles', () => {
        const { getByText } = render(<RecommendDiv>Recommended</RecommendDiv>);
        const recommendDiv = getByText('Recommended');
        expect(recommendDiv).toHaveStyle(`
      background-color: #59A3A2;
      border-radius: 10px;
    `);
    });

    test('HeadingText1 and HeadingText2 render with expected colors', () => {
        const { getByText } = render(
            <>
                <HeadingText1>Heading 1</HeadingText1>
                <HeadingText2>Heading 2</HeadingText2>
            </>
        );
        const heading1 = getByText('Heading 1');
        const heading2 = getByText('Heading 2');

        expect(heading1).toHaveStyle('color: #D9D9D9;');
        expect(heading2).toHaveStyle('color: #074753;');
    });

    test('Text1 and Text2 render with expected styles', () => {
        const { getByText } = render(
            <>
                <Text1>Text 1</Text1>
                <Text2>Text 2</Text2>
            </>
        );
        const text1 = getByText('Text 1');
        const text2 = getByText('Text 2');

        expect(text1).toHaveStyle('color: #D9D9D9; line-height: 1.5;');
        expect(text2).toHaveStyle('color: #074753; line-height: 1.5;');
    });
});
