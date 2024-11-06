import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link, useLocation} from 'react-router-dom';
import {Button, Container} from '@mui/material';
import ProfilePage from './page/profile';
import OtherProfilePage from "./page/other-profile";


function App() {
    const location = useLocation();

    return (
        <Container>
            {/* Кнопка для перехода на страницу ProfilePage, отображается только на главной странице */}
            {location.pathname !== '/profile' &&  location.pathname !== '/otherprofile' && (
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/profile"
                    sx={{mt: 4}}
                >
                    Перейти на страницу профиля
                </Button>
            )}

            {/* Настройка маршрутов */}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
            </Routes>

            {/* Кнопка для перехода на страницу ProfilePage, отображается только на главной странице */}
            {location.pathname !== '/profile' &&  location.pathname !== '/otherprofile' && (
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/otherprofile"
                    sx={{mt: 4}}
                >
                    Перейти на страницу профиля
                </Button>
            )}

            {/* Настройка маршрутов */}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/otherprofile" element={<OtherProfilePage/>}/>
            </Routes>
        </Container>

    );
}

// Главная страница (можно изменить под свои нужды)
function Home() {
    return (
        <Container>
            <h1>Главная страница</h1>
            <p>Здесь может быть контент домашней страницы.</p>
        </Container>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}
