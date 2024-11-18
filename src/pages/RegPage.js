import React, { useState } from "react";
import {
    Box,
    Typography,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    OutlinedInput,
    LinearProgress
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    ErrorText,
    Form,
    GoogleButton,
    HeadingText,
    StyledButton,
    FormContainer,
    MainContainer,
    LoginLink
} from "../styles/RegPageStyles";
import google from "../assets/icons/googleLogo.svg";
import {Link} from "react-router-dom";

const getPasswordStrength = (password) => {
    if (password.length < 8) return { strength: "Слабый", color: "red", value: 20 };
    if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 12) {
        return { strength: "Сильный", color: "green", value: 100 };
    }
    return { strength: "Средний", color: "orange", value: 60 };
};

 const RegPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const passwordStrength = getPasswordStrength(password);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError("Пароли не совпадают");
        } else if (password.length < 6) {
            setPasswordError("Пароль должен содержать не менее 6 символов");
        } else {
            setPasswordError("");
            console.log("Аккаунт создан:", { username, email, password });
        }
    };

    return (
        <MainContainer>
            <FormContainer>
                <HeadingText>Создать аккаунт</HeadingText>
                <Form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel shrink={Boolean(username)}>Логин</InputLabel>
                        <OutlinedInput
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            label="Логин"
                            required
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel shrink={Boolean(email)}>Email</InputLabel>
                        <OutlinedInput
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
                            required
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel shrink={Boolean(password)}>Пароль</InputLabel>
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
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {password && (
                        <Box mt={1}>
                            <Typography variant="body2" color={passwordStrength.color}>
                                Сила пароля: {passwordStrength.strength}
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={passwordStrength.value}
                                sx={{
                                    height: 6,
                                    borderRadius: 1,
                                    "& .MuiLinearProgress-bar": {
                                        background: passwordStrength.value <= 30
                                            ? 'linear-gradient(to right, #ff0000, #ff7f7f)' // Красный для слабого
                                            : passwordStrength.value <= 60
                                                ? 'linear-gradient(to right, #ffcc00, #ffff66)' // Желтый для среднего
                                                : 'linear-gradient(to right, #66ff66, #00cc00)', // Зеленый для сильного
                                    },
                                    bgcolor: '#ddd',
                                }}
                            />
                        </Box>
                    )}
                    <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel>Повторите пароль</InputLabel>
                        <OutlinedInput
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            label="Повторите пароль"
                            required
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {passwordError && <ErrorText>{passwordError}</ErrorText>}
                    <StyledButton type="submit" as={Link} to="/Library">Создать аккаунт</StyledButton>
                    <GoogleButton>
                        <img src={google} alt="Google Logo" style={{ marginRight: 10 }} />
                        Продолжить с Google
                    </GoogleButton>
                </Form>
                <LoginLink>
                    Уже есть аккаунт? <a href="/Login">Войти</a>
                </LoginLink>
            </FormContainer>
        </MainContainer>
    );
};

export default RegPage;
