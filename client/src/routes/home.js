import React from 'react';
import { Outlet } from 'react-router-dom';
import { Build } from '../components/Build.js';

export const Home = () => {
    return (
        <>
            <Build />
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
};
