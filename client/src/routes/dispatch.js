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
import { Membre, loader as membreLoader } from './member.js';
import { Admin, loader as adminLoader, action as adminAction } from './admin.js';
import { AdminUser, loader as adminUserLoader } from './adminUser.js';
import { AdminAddMember, action as adminAddMembreAction } from './adminAddMember.js';
import {
    AdminFonctionnalite,
    loader as adminFonctionnaliteLoader,
    action as adminFonctionnaliteAction,
} from './adminFonctionnalite.js';
import { ErrorElement } from '../components/ErrorElement.js';

const router = createBrowserRouter([
    {
        path: 'login',
        element: <Login />,
        loader: loginLoader,
        action: loginAction,
        errorElement: <ErrorElement />,
    },
    {
        path: 'register',
        element: <Register />,
        loader: registerLoader,
        action: registerAction,
        errorElement: <ErrorElement />,
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
                errorElement: <ErrorElement />,
            },
            {
                path: 'home',
                element: <Home />,
                errorElement: <ErrorElement />,
            },
            {
                path: 'my-training/',
                element: <MyTraining />,
                loader: myTrainingLoader,
                action: myTrainingAction,
                errorElement: <ErrorElement />,
            },
            {
                path: 'training/edit/:idTraining',
                element: <CreateTraining />,
                loader: createTrainingLoader,
                errorElement: <ErrorElement />,
            },
            {
                path: 'training/:idTraining',
                element: <ShowTraining />,
                loader: trainingLoader,
                errorElement: <ErrorElement />,
            },
            {
                path: 'membre/:idMembre',
                element: <Membre />,
                loader: membreLoader,
                errorElement: <ErrorElement />,
            },
            {
                path: 'admin',
                element: <Admin />,
                loader: adminLoader,
                action: adminAction,
                errorElement: <ErrorElement />,
            },
            {
                path: 'admin/membre/:id',
                element: <AdminUser />,
                loader: adminUserLoader,
                errorElement: <ErrorElement />,
            },
            {
                path: 'admin/add-membre',
                element: <AdminAddMember />,
                action: adminAddMembreAction,
                errorElement: <ErrorElement />,
            },
            {
                path: 'admin/fonctionnalite/edit/:idFonctionnalite',
                element: <AdminFonctionnalite />,
                loader: adminFonctionnaliteLoader,
                action: adminFonctionnaliteAction,
                errorElement: <ErrorElement />,
            },
        ],
    },
    {
        path: '*',
        element: <ErrorElement />,
    },
]);

export function Dispatch() {
    return (
        <React.StrictMode>
            <RouterProvider router={router}></RouterProvider>
        </React.StrictMode>
    );
}
