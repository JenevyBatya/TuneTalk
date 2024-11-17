import styled from 'styled-components';
import logo from '../assets/Logo.svg';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

 const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: left;
    background-color: #AECBC9;
    height: calc(env(safe-area-inset-top) + 60px); /* Учитываем высоту безопасной области сверху */
    padding-top: env(safe-area-inset-top); /* Добавляем отступ для "чёлки" */
    position: sticky;
    top: 0;
    z-index: 10;
    max-width: 600px;
`;

export const Logo = styled.img`
    height: 30px;
    margin-left: 20px;
`;

export const MobileHeader = () => {
    return (
        <Header>
            <Button as={Link} to="/">
            <Logo src={logo} alt="Логотип" />
            </Button>
        </Header>
    );
};

export default MobileHeader;
