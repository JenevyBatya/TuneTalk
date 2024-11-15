import React, {useState} from "react";
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

export const LoginPage = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!identifier || !password) {
            setLoginError("Both fields are required");
        } else if (isValidEmail(identifier) || identifier.length >= 3) {

            setLoginError("");
            console.log("Logging in with:", {identifier, password});

        } else {
            setLoginError("Please enter a valid email or username (min 3 characters)");
        }
    };

    return (
        <MainContainer>
            <FormContainer>
                <HeadingText>Вход в аккаунт</HeadingText>
                <Form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel>Логин</InputLabel>
                        <OutlinedInput
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            label="Логин или Email"
                            required
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel>Пароль</InputLabel>
                        <OutlinedInput
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
                <LoginLink>Нет аккаунта? <a href="/Registration">Создать</a></LoginLink>
            </FormContainer>
        </MainContainer>
    );
};

export default LoginPage;
