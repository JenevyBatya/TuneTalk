import React from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "../features/authSlice";
import {Button} from "@mui/material";
import {styled} from "@mui/system";
const LogoutStyledButton = styled(Button)(({theme}) => ({
    backgroundColor: '#C0EF00',
    color: '#000',
    fontWeight: 'bold',
    borderRadius: '8px',
    textTransform: 'none',
    height: '30px',
    '&:hover': {
        backgroundColor: '#C0EF00',
    },
    marginRight: '15px',
}));

const HeaderButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = localStorage.getItem("username");

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/');
    };
    const handleLogin = () => {
        navigate("/Login");
    }

    return (
        <LogoutStyledButton onClick={user? handleLogout : handleLogin}>
            {user ? 'Выйти' : 'Войти'}
        </LogoutStyledButton>
    );
};

export default HeaderButton;