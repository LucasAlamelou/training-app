import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const Home = () => {
    return (
        <>
            <p>Hello Home</p>
            <Link to="/login">Login</Link>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
};
