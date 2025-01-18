import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import {Typography} from "@mui/material";
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  text-align: center;
  background-color: #f4f4f4;
`;

const ErrorCode = styled(Typography)`
  font-size: 300px;
  font-weight: bold;
  color: black;
  margin-bottom: 20px; 
`;

const Message = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  line-height: 1.5;
  display: block;
`;
const Emoji = styled.div`
  font-size: 50px; 
  margin-bottom: 10px; 
`;

const ProtectedRoute = () => {
    const username = localStorage.getItem("username");

    if (!username) {
        return (
            <Container>
                <Emoji>😞</Emoji>
                <ErrorCode variant="h1">401</ErrorCode>
                <Message>
                    На эту страницу не попасть без входа
                    <br />
                    <NavLink to='/Login'>Войти</NavLink> для получения доступа
                </Message>
            </Container>
        );
    }
    return <Outlet/>
}

export default ProtectedRoute;