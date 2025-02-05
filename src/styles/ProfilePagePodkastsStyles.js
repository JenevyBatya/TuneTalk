import styled from "styled-components";

export const MainContainer = styled.div`
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    margin: 0 auto; 
    min-height: 100vh; 
    box-sizing: border-box;
    overflow-y: auto; 
`;
export const ProfileDiv = styled.div`
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 10px;
    min-height: 100vh;
    box-sizing: border-box;
    overflow-y: auto;
`


export const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 0;
    max-width: 600px; /* Ограничение ширины блока */
    background: #fff;
    //box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: Jost;
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
    height: auto;
`;

export const EditButton = styled.button`
    background: white;
    color: #173E47;
    font-size: 12px;
    min-height: 30px;
    width: auto;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    cursor: pointer;
    height: auto;
`;

export const StatsContainer = styled.div`
    width: 100%;
    display: flex;
    margin-top: 20px;
    color: #666;
    max-width: 100%; 
    justify-content: space-around; 
    padding: 15px 0; 
    font-size: 14px;
    //background-color: #f9f9f9; 
    //box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    border-radius: 10px; 
    margin-bottom: 20px; 
`;

export const StatsItem = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer; 

    &:hover {
        background-color: #f0f0f0; 
        color: #282c34;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
        border-radius: 8px; 
    }
`;

export const StarIcon = styled.img `
    width: 20px;
    height: auto;
    margin-left: 2%;
`

export const StatText = styled.span`
    margin: 0 5px;
`;
export const SectionComponent = styled.div`
    margin: 0;
    width: 100%;
`
export const FooterContainer = styled.div`
    margin-top: 20%;
    bottom: 0;
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
`

export const AddButton = styled.button `
    border-radius: 13px;
    border: 0;
    background: #173E47;
    text-align: center;
    align-content: center;
    font-size: 14px;
    color: white;
    width: 80%;
    margin-bottom: 3%;
    height: 40%;
    min-height: 45px;
    box-shadow: none;
    margin-left: auto;
    margin-right: auto;
    text-decoration: none;

    &:hover {

        background: #3e6670;
    }
`
export const SubscribeDiv = styled.div` 
    width:auto;
    align-items: center;
    //background-color: #173E47;
    cursor: pointer;
    
`

