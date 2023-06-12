import React from 'react';
import { redirect, Navigate } from 'react-router-dom';
import { Form } from '../components/Form.js';
import { ActionFormLoginRegister } from '../util/ActionForm.js';
import { useSelector } from 'react-redux';

export function loader({ request }) {
    let data = {};
    return data;
}

export async function action({ param, request }) {
    let formData = await request.formData();
    const result = await ActionFormLoginRegister(formData, 'register', 'post');
    if (result.token && result.id && result.user) {
        return redirect('/home');
    }
    return result;
}

export const Register = () => {
    const { user } = useSelector((state) => state);
    return (
        <>
            {user?.isConnected && user?.tokenEncrypt ? (
                <Navigate to="/my-training">Page d'acceuil</Navigate>
            ) : (
                <Form pageLogin={false} />
            )}
        </>
    );
};
