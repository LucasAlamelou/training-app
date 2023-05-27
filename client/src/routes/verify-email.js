import React from 'react';
import { VerifyEmailPage } from '../pages/VerifyEmailPage.js';
import { getLoader } from '../util/Loader.js';

export async function loader({ context, params }) {
    const { token } = params;
    console.log(token);
    const url = 'verify-email';
    const response = await getLoader(url, 'GET', { token });
    if (response?.error) {
        return response;
    }
    return response?.info;
}

export const VerifyEmail = () => {
    return (
        <>
            <VerifyEmailPage />
        </>
    );
};
