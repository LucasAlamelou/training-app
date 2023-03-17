import * as React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Root } from '../pages/Root.js';
import { Home } from './home.js';
import { Login, loader as loginLoader, action as loginAction } from './login.js';
import { Register, loader as registerLoader, action as registerAction } from './register.js';
import {
    CreateTraining,
    loader as createTrainingLoader,
    action as createTrainingAction,
} from './createTraining.js';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: 'login',
                element: <Login />,
                loader: loginLoader,
                action: loginAction,
            },
            {
                path: 'register',
                element: <Register />,
                loader: registerLoader,
                action: registerAction,
            },
            {
                path: 'create-training',
                element: <CreateTraining />,
                loader: createTrainingLoader,
                action: createTrainingAction,
            },
            {
                path: 'home',
                element: <Home />,
            },
        ],
    },
]);

export function Dispatch() {
    return (
        <React.StrictMode>
            <RouterProvider router={router}></RouterProvider>
        </React.StrictMode>
    );
}
