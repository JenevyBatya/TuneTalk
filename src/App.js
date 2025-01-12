// import logo from './logo.svg';
import './App.css';
import {HashRouter, Route, Routes, useLocation} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegPage from "./pages/RegPage";
import Library from "./pages/Library";

import Subscriptions from "./pages/Subscriptions";
import AudioPodcastPage from "./pages/AudioPodcastPage";
import FollowersPage from "./pages/FollowersPage";
import EditProfilePage from "./pages/EditProfilePage";
import ProfilePageNew from "./pages/ProfilePage";


function App() {
    const location = useLocation();

    // Вывод текущего пути в консоль
    console.log("Current path:", location.pathname);

    return (
        <LandingPage/>
    );
}

function Root() {
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

export default Root;