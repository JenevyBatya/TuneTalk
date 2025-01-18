import React from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "../features/authSlice";
import {Button} from "@mui/material";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/');
    };

    return (
        <Button onClick={handleLogout} disableRipple>Выйти</Button>
    );
};

export default LogoutButton;