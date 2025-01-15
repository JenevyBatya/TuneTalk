import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegPage from "./pages/RegPage";
import Library from "./pages/Library";
import Subscriptions from "./pages/Subscriptions";
import AudioPodcastPage from "./pages/AudioPodcastPage";
import FollowersPage from "./pages/FollowersPage";
import EditProfilePage from "./pages/EditProfilePage";
import ProfilePageNew from "./pages/ProfilePage";
import VideoPage from "./pages/VideioPlayerPage";


function Root() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/Registration" element={<RegPage />} />
                <Route path="/Login" element={<LoginPage />} />
                <Route path="/Library" element={<Library />} />
                <Route path="/Subscriptions" element={<Subscriptions />} />
                <Route path="/Users/:type" element={<FollowersPage />} />
                <Route path="/Profile" element={<ProfilePageNew />} />
                <Route path="/EditProfile" element={<EditProfilePage />} />
                <Route path="/Audio-podcast/:id" element={<AudioPodcastPage />} />
                <Route path="/Video-podcast/:id" element={<VideoPage/>}/>

            </Routes>
        </HashRouter>
    );
}

export default Root;
