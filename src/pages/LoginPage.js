import axios from 'axios';
import React, {useState, useEffect} from "react";
import {
    ErrorText,
    Form,
    HeadingText,
    LoginLink,
    MainContainer,
    StyledButton,
    FormContainer
} from "../styles/LoginPageStyles";
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export const LoginPage = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const history = useNavigate(); // Для программного редиректа
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            if (!identifier || !password) {
                setLoginError("Both fields are required");
            } else if (isValidEmail(identifier) || identifier.length >= 3) {
                setLoginError("");
                console.log("Logging in with:", {identifier, password});
                const response = await axios.post('http://26.227.27.136:80/auth/login', {
                    email: identifier,
                    password: password
                });
                if (response.status === 200){
                    // Перенаправление на другую страницу после успешного входа
                    history('/library');
                }
            } else {
                setLoginError("Please enter a valid email or username (min 3 characters)");
            }
        } catch (error) {
            if (error.status === 400){
                setLoginError("Check your credentials");
            }
            if (error.status === 404){
                setLoginError("Check your email");
            }
        }
    };
    useEffect(() => {
        if (identifier || password) {
            setIdentifier(identifier);
            setPassword(password);
        }
    }, [identifier, password]);
    return (
        <MainContainer>
            <FormContainer>
                <HeadingText>Вход в аккаунт</HeadingText>
                <Form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel htmlFor="identifier-input" shrink={!!identifier}>Логин или Email</InputLabel>
                        <OutlinedInput
                            id="identifier-input"
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            label="Логин или Email"
                            required
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel htmlFor="password-input" shrink={!!password}>Пароль</InputLabel>
                        <OutlinedInput
                            id="password-input"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Пароль"
                            required
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    {loginError && <ErrorText>{loginError}</ErrorText>}
                    <StyledButton type="submit">Войти</StyledButton>
                </Form>
                <LoginLink>Нет аккаунта? <a href="/registration">Создать</a></LoginLink>
                <Link to="/registration">Создать</Link>
                <Link to="/registration">Создать</Link>
            </FormContainer>
        </MainContainer>
    );
};

export default LoginPage;
