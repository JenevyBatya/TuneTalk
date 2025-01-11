import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../features/authSlice";
import {
    ErrorText,
    Form,
    HeadingText,
    LoginLink,
    MainContainer,
    StyledButton,
    FormContainer,
} from "../styles/LoginPageStyles";
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading, error} = useSelector((state) => state.auth);
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!identifier || !password) {
            setLoginError("Both fields are required");
            return;
        }

        if (isValidEmail(identifier) || identifier.length >= 3) {
            setLoginError("");
            try {
                await dispatch(login({identifier, password})).unwrap();
                navigate("/library");
            } catch (err) {
                setLoginError(err || "Login failed, please try again.");
            }
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
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {error?.message && <ErrorText>{error.message}</ErrorText>}
                    <StyledButton type="submit" disabled={isLoading}>
                        {isLoading ? "Загрузка..." : "Войти"}
                    </StyledButton>
                </Form>
                <LoginLink>
                    Нет аккаунта? <a href="/registration">Создать</a>
                </LoginLink>
            </FormContainer>
        </MainContainer>
    );
};

export default LoginPage;
