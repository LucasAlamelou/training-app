import React from 'react';
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
    return (
        <>
            <Form pageLogin={true} />
        </>
    );
};
