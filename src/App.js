import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegPage from './pages/RegPage';
import LoginPage from "./pages/LoginPage";
import Library from "./pages/Library";
import Subscriptions from "./pages/Subscriptions";
import FollowersPage from "./pages/FollowersPage";
import EditProfilePage from "./pages/EditProfilePage";
import ProfilePageNew from "./pages/ProfilePage";
import AudioCutterPage from './pages/AudioCutterPage';

export function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<AudioCutterPage/>}/>
                <Route path='/Registration' element={<RegPage/>}/>
                <Route path='/Login' element={<LoginPage/>}/>
                <Route path="/Library" element={<Library/>}/>
                <Route path="/Subscriptions" element={<Subscriptions/>}/>
                {/*<Route path="/Account" element={<ProfilePage />} />*/}
                <Route path="/Users/:type" element={<FollowersPage/>}/>
                <Route path="/Profile" element={<ProfilePageNew/>}/>
                <Route path="/EditProfile" element={<EditProfilePage/>}/>

            </Routes>
        </Router>
    );
}
