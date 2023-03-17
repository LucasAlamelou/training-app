import React from 'react';
import { redirect } from 'react-router-dom';
import { Form } from '../components/Form.js';
import { ActionFormLoginRegister } from '../util/ActionForm.js';

export function loader({ request }) {
    let data = {};
    return data;
}

export async function action({ param, request }) {
    let formData = await request.formData();
    const result = await ActionFormLoginRegister(formData, 'login', 'post');
    if (result.token && result.id) {
        return redirect('/home');
    }
    return result;
}

export const Login = () => {
    return (
        <>
            <Form pageLogin={true} />
        </>
    );
};
