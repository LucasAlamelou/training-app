import React from 'react';
import { MemberPage } from '../pages/MemberPage.js';
import { getLoader } from '../util/Loader.js';
import styled from 'styled-components';

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
            <H2>Attention mode : Adminstrateur</H2>
            <MemberPage isAdmin={true} />
        </>
    );
};

const H2 = styled.h2`
    color: red;
    font-size: 1.5rem;
    font-weight: 400;
    margin-left: 1rem;
    margin-bottom: 1rem;
    padding: 0;
    text-decoration: underline;
`;
