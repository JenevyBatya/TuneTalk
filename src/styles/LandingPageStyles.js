import styled from "styled-components";

export const MainContainer = styled.div`
    width: 100%;
    max-width: 600px;
    height: auto;
    background-color: #AECBC9;
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin: 0 auto;
    padding: 0px;
    border-radius: 8px;
    color: white;
    text-align: left;
    font-family: Jost;

`;

export const Header = styled.div`
    width: 100%;
    background-color: #074753;
    color: white;
    padding: 16px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    position: sticky;
    top: 0;
    z-index: 100;

`;

export const RecBlock = styled.div`
    width: auto;
    padding: 20px;
    background-color: #074753;
    color: white;
`;

export const HeadingText2 = styled.div`
    font-size: 26px;
    //font-weight: bold;
    color: #074753;
    margin-bottom: 8px;
`;
export const HeadingText1 = styled.div`
    font-size: 26px;
    //font-weight: bold;
    color: #D9D9D9;

    margin-bottom: 8px;
`;

export const Text1 = styled.div`
    font-size: 16px;
    color: #D9D9D9;
    line-height: 1.5;
    margin-bottom: 16px;

`;
export const Text2 = styled.div`
    font-size: 16px;
    color: #074753;
    line-height: 1.5;
    margin-bottom: 16px;
`;

export const PhotoDiv = styled.div`
    width: 80%;
    height: auto;
    background-color: rgba(97, 218, 251, 0);
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    margin-bottom: 16px;
    margin-left: auto;
    margin-right: auto;
`;

export const Photo = styled.img`
    width: 80%;
    height: auto;
    object-fit: cover;
    border-radius: 20px;
`;

export const StyledButton = styled.button`
    width: 75%;
    background-color: #59A3A2;
    color: white;
    font-size: 14px;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 16px;
    margin-left: 12%;
    margin-right: auto;
`;

export const RegBlock = styled.div`
    width: auto;
    padding: 20px;
    border-radius: 8px;
    color: white;
    text-align: left;
    background-color: #adc9c7;
`;
export const HeaderBlock = styled.div`
    min-height: 40px;
`
