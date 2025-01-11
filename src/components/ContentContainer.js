import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
    margin-top: 20px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    & > *:not(:last-child) {
        margin-bottom: 10px;
    }
`;

const ContentContainer = ({ children }) => {
    return <StyledContainer>{children}</StyledContainer>;
};

export default ContentContainer;
