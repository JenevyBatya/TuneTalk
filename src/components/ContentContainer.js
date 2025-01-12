import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
    margin-top: 20px;
    background: #fff;
    border-radius: 10px;
    padding: 0;
    margin: 0;

    & > *:not(:last-child) {
        margin-bottom: 10px;
    }
`;

const ContentContainer = ({ children }) => {
    return <StyledContainer>{children}</StyledContainer>;
};

export default ContentContainer;
