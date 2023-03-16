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
    const result = await ActionForm(formData, 'login', 'post');
    console.log(result);
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
