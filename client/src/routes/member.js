import React from 'react';
import { MemberPage } from '../pages/MemberPage.js';
import { getLoader } from '../util/Loader.js';

export async function loader({ params }) {
    const url = 'getMember';
    const method = 'GET';
    const param = {
        idMember: params.idMembre,
    };
    const result = await getLoader(url, method, param);
    if (!result.info) {
        return result;
    }
    return result.info;
}

export const Membre = () => {
    return (
        <>
            <MemberPage />
        </>
    );
};
