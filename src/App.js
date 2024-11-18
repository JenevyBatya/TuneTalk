import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegPage from './pages/RegPage';
import LoginPage from "./pages/LoginPage";
import Library from "./pages/Library";
import Subscriptions from "./pages/Subscriptions";
import ProfilePage from "./pages/profile";

export function App() {
    return (
        <Router>
                <Routes>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/registration' element={<RegPage />} />
                    <Route path='login' element={<LoginPage/>}/>
                    <Route path="/library" element={<Library />} />
                    <Route path="/subscriptions" element={<Subscriptions />} />
                    <Route path="/account" element={<ProfilePage />} />
                </Routes>
        </Router>
    );
}
