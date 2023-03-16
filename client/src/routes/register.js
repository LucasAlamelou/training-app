import React from 'react';
import { redirect } from 'react-router-dom';
import { Form } from '../components/Form.js';
import { ActionForm } from '../util/ActionForm.js';

export function loader({ request }) {
    let data = {};
    return data;
}

export async function action({ param, request }) {
    let formData = await request.formData();
    const result = await ActionForm(formData, 'register', 'post');
    if (result.token && result.id && result.user) {
        return redirect('/home');
    }
    return result;
}

export const Register = () => {
    return (
        <>
            <Form isLogin={false} />
        </>
    );
};
