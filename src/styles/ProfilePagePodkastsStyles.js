import styled from "styled-components";

export const MainContainer = styled.div `
    width: 100%;
    max-width: 600px;
    display: flex;
`


export const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 600px; /* Ограничение ширины блока */
    background: #fff;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
`;

export const Pic = styled.img`
    width: 180px;
    height: 180px;
    object-fit: cover;
    border-radius: 20px;
`;

export const InfoDiv = styled.div`
    flex: 1;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
`;

export const Username = styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin: 0 0 10px 0;
`;

export const Description = styled.p`
    font-size: 14px;
    color: #666;
    margin: 0 0 15px 0;
`;

export const LinkDiv = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;

export const LinkLogo = styled.img`
    width: 16px;
    height: 16px;
    margin-right: 5px;
`;

export const LinkText = styled.a`
    font-size: 12px;
    color: #173E47;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export const EditButtonDiv = styled.div`
    justify-content: center;
    align-items: center;
    background-color: #173E47;
    cursor: pointer;
    width: fit-content;
`;

export const EditButton = styled.button`
    background: white;
    color: #173E47;
    font-size: 12px;
    height: 30px;
    width: auto;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    cursor: pointer;
`;

export const StatsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 12px;
    color: #666;
`;

export const StatsItem = styled.div`
    display: flex;
    align-items: center;
`;

export const StatText = styled.span`
    margin: 0 5px;
`;

export const Sections = styled.div `

`


