import React from 'react';
import { MemberPage } from '../pages/MemberPage.js';
import { getLoader } from '../util/Loader.js';

export async function loader({ request, params }) {
    const url = 'admin/getUserAndMemberAll';
    const method = 'GET';
    const requestUrl = request.url;
    let param = {};
    if (requestUrl.includes('membre')) {
        param = {
            idMember: params.id,
        };
    } else {
        param = {
            idUser: params.id,
        };
    }
    const result = await getLoader(url, method, param);
    if (!result.info) {
        return result;
    }
    return result.info;
}

export const AdminUser = () => {
    return (
        <>
            <h2>Mode : Adminstrateur</h2>
            <MemberPage isAdmin={true} />
        </>
    );
};
