import React from 'react';
import { useSelector } from 'react-redux';
import { AdminPage } from '../pages/AdminPage.js';
import { getLoader } from '../util/Loader.js';
import { deleteAction } from '../util/Action.js';
import { ACTION_DELETE_MEMBER, ACTION_DELETE_USER } from '../pages/AdminPage.js';

const ROLES = 'ROLE_ADMIN';

export async function loader() {
    const members = await getLoader('admin/getMembers', 'GET');
    const users = await getLoader('admin/getUsers', 'GET');
    if (members.error || users.error)
        return { error: { message: 'Erreur lors du chargement de la page' } };
    return { members: members.info, users: users.info };
}

export async function action({ request, parms }) {
    const formData = await request.formData();
    if (formData.get('actionMethod') === ACTION_DELETE_MEMBER) {
        return deleteMember({ idMember: formData.get('id') });
    }
    if (formData.get('actionMethod') === ACTION_DELETE_USER) {
        return deleteUser({ idUser: formData.get('id') });
    }

    return null;
}

export async function deleteMember({ idMember }) {
    return await deleteAction({ idMember }, 'admin/deleteMember');
}

export async function deleteUser({ idUser }) {
    return await deleteAction({ idUser }, 'admin/deleteUser');
}

export const Admin = () => {
    const user = useSelector((state) => state.user);
    if (!user.roles.includes(ROLES)) {
        // TODO: redirect to 404
        return <h1>Vous n'avez pas les droits pour accéder à cette page !</h1>;
    }
    return (
        <>
            <AdminPage />
        </>
    );
};
