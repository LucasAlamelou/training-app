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
import {
    MyTraining,
    loader as myTrainingLoader,
    action as myTrainingAction,
} from './myTraining.js';
import { ShowTraining, loader as trainingLoader } from './showTraining.js';

const router = createBrowserRouter([
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
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/my-training/new',
                element: <CreateTraining />,
                loader: createTrainingLoader,
                action: createTrainingAction,
            },
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 'my-training/',
                element: <MyTraining />,
                loader: myTrainingLoader,
                action: myTrainingAction,
            },
            {
                path: 'training/:idTraining',
                element: <ShowTraining />,
                loader: trainingLoader,
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
