import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegPage from './pages/RegPage';
import LoginPage from "./pages/LoginPage";
import Library from "./pages/Library";
import Subscriptions from "./pages/Subscriptions";
import AudioPodcastPage from "./pages/AudioPodcastPage";
import FollowersPage from "./pages/FollowersPage";
import EditProfilePage from "./pages/EditProfilePage";
import ProfilePageNew from "./pages/ProfilePage";

export function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route path='/Registration' element={<RegPage/>}/>
                <Route path='/Login' element={<LoginPage/>}/>
                <Route path="/Library" element={<Library/>}/>
                <Route path="/Subscriptions" element={<Subscriptions/>}/>
                {/*<Route path="/Account" element={<ProfilePage />} />*/}
                <Route path="/Users/:type" element={<FollowersPage/>}/>
                <Route path="/Profile" element={<ProfilePageNew/>}/>
                <Route path="/EditProfile" element={<EditProfilePage/>}/>
                <Route path="/Audio-podcast/:id" element={<AudioPodcastPage/>} />
            </Routes>
        </Router>
    );
}
