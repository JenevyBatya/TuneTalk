// import logo from './logo.svg';
import './App.css';
import {HashRouter, Route, Routes, useLocation} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegPage from "./pages/RegPage";
import Library from "./pages/Library";
import {Subscriptions} from "@mui/icons-material";
import ProfilePage from "./pages/Profile";

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
        <HashRouter>
            <Routes>

                <Route path='/' element={<LandingPage/>}/>
                <Route path='/registration' element={<RegPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path="/library" element={<Library/>}/>
                <Route path="/subscriptions" element={<Subscriptions/>}/>
                <Route path="/account" element={<ProfilePage/>}/>
            </Routes>
        </HashRouter>
    );
}

export default Root;