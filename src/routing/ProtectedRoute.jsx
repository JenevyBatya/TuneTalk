import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import {Typography} from "@mui/material";
const ProtectedRoute = () => {
    const username = localStorage.getItem("username");

    if (!username) {
        return (
            <Typography>
                Unauthorized :(
                <span>
          <NavLink to='/Login'>Login</NavLink> to gain access
        </span>
            </Typography>
        );
    }
    return <Outlet/>
}

export default ProtectedRoute;