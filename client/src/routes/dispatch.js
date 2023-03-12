import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './home.js';
import { Login } from './login.js';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: 'login',
                element: <Login />,
            },
        ],
    },
]);

export function Dispatch() {
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}
