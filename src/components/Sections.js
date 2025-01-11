import React, {useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import styled from 'styled-components';

import LikedIcon from '../assets/icons/Liked.svg';
import SavedIcon from '../assets/icons/Saved.svg';

const SectionsContainer = styled.div`
    display: flex;
    padding: 10px 0;
    margin: 0;
    justify-content: space-between;
    flex-direction: row;
`;
const SectionBackground = styled.div`
    background: ${(props) => (props.active ? 'white' : ' #FF7510')};
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: fit-content;
`;

const SectionButton = styled.div`
    border-radius: 10px;
    background: ${(props) => (props.active ? ' #FF7510' : 'white')};
    color: black;
    font-size: 12px;
    height: 30px;
    width: auto;
    font-weight: bold;
    border: none;
    padding: 5px 10px;
    align-content: center;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: ${(props) => (props.active ? 'white' : 'black')};
    gap: 4px;
    text-align: center;

    &:hover {
        color: #FFFFFF;
    }
`;

const SectionLogo = styled.img`
    width: 24px;
    height: 24px;
`;

const SectionLabel = styled.span`
    font-size: 12px;
`;


function Sections() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    // Синхронизируем значение `value` с текущим маршрутом
    useEffect(() => {
        switch (location.pathname) {
            case '/podcasts':
                setValue(0);
                break;
            case '/playlists':
                setValue(1);
                break;
            case '/liked':
                setValue(2);
                break;
            case '/saved':
                setValue(3);
                break;
            default:
                setValue(0);
                break;
        }
    }, [location.pathname]);

    const handleNavigation = (index) => {
        setValue(index);
        switch (index) {
            case 0:
                navigate('/podcasts');
                break;
            case 1:
                navigate('/playlists');
                break;
            case 2:
                navigate('/liked');
                break;
            case 3:
                navigate('/saved');
                break;
            default:
                break;
        }
    };

    return (
        <SectionsContainer>
            <SectionBackground
                active={value === 0}
                onClick={() => handleNavigation(0)}>
                <SectionButton
                    active={value === 0}
                    onClick={() => handleNavigation(0)}
                >

                    <SectionLabel>Подкасты</SectionLabel>
                </SectionButton>
            </SectionBackground>
            <SectionBackground
                active={value === 1}
                onClick={() => handleNavigation(1)}>
                <SectionButton
                    active={value === 1}
                    onClick={() => handleNavigation(1)}
                >

                    <SectionLabel>Плейлисты</SectionLabel>
                </SectionButton>
            </SectionBackground>
            <SectionBackground
                active={value === 2}
                onClick={() => handleNavigation(2)}>
                <SectionButton
                    active={value === 2}
                    onClick={() => handleNavigation(2)}
                >
                    <SectionLogo src={LikedIcon} alt="Избранное"/>

                </SectionButton>
            </SectionBackground>
            <SectionBackground
                active={value === 3}
                onClick={() => handleNavigation(3)}>
                <SectionButton
                    active={value === 3}
                    onClick={() => handleNavigation(3)}
                >
                    <SectionLogo src={SavedIcon} alt="Сохраненное"/>

                </SectionButton>
            </SectionBackground>
        </SectionsContainer>
    );
}

export default Sections;
