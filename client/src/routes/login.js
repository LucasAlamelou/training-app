import React from 'react';
import { Form } from '../components/Form.js';
import { ActionFormLoginRegister } from '../util/ActionForm.js';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function loader({ request }) {
    let data = {};
    return data;
}

export async function action({ param, request }) {
    let formData = await request.formData();
    const result = await ActionFormLoginRegister(formData, 'login', 'POST');
    if (result.token && result.id) {
        /*dispatch(
            authActions.addUserConnected({
                isConnected: true,
                user: result.id,
                token: result.token,
            })
        );*/

        return result;
    }
    return result;
}

export const Login = () => {
    const { user } = useSelector((state) => state);
    return (
        <>
            {user?.isConnected && user?.token ? (
                <Navigate to="/home">Page d'acceuil</Navigate>
            ) : (
                <Form pageLogin={true} />
            )}
        </>
    );
};
