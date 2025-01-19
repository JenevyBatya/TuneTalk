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
import AudioCutterPage from './pages/AudioCutterPage';
import VideoPage from "./pages/VideioPlayerPage";
import OtherProfilePage from "./pages/OtherProfilePage";
import ProtectedRoute from "./routing/ProtectedRoute";



function Root() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/Registration" element={<RegPage />} />
                <Route path="/Login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/Library" element={<Library />} />
                    <Route path="/Subscriptions" element={<Subscriptions />} />
                    <Route path="/Users/:type" element={<FollowersPage />} />
                    <Route path="/Profile" element={<ProfilePageNew />} />
                    <Route path="/OtherProfile" element={<OtherProfilePage/>} />
                    <Route path="/EditProfile" element={<EditProfilePage />} />
                    <Route path="/Audio-podcast/:id" element={<AudioPodcastPage />} />
                    <Route path="/Video-podcast/:id" element={<VideoPage/>}/>
                    <Route path="/AudioCutter" element={<AudioCutterPage/>}/>
                 </Route>
            </Routes>
        </HashRouter>
    );
}

export default Root;
