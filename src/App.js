import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import {Button, Container} from '@mui/material';
import ProfilePage from './page/profile'; // Импорт компонента профиля

function App() {
    return (
        <Router>
            <Container>
                {/* Кнопка для перехода на страницу ProfilePage */}
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/profile"
                    sx={{mt: 4}}
                >
                    Перейти на страницу профиля
                </Button>

                {/* Настройка маршрутов */}
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                </Routes>
            </Container>
        </Router>
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

export default App;
