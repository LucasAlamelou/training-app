import React from 'react';
import { useSelector } from 'react-redux';
import { AdminPage } from '../pages/AdminPage.js';
import { getLoader } from '../util/Loader.js';
import { deleteAction, modifyAction } from '../util/Action.js';
import {
    ACTION_DELETE_MEMBER,
    ACTION_DELETE_USER,
    ACTION_DELETE_FONCTIONNALITE,
    ACTION_SET_ACTIVE_FONCTIONNALITE,
} from '../pages/AdminPage.js';

const ROLES = 'ROLE_ADMIN';

export async function loader() {
    const members = await getLoader('admin/getMembers', 'GET');
    const users = await getLoader('admin/getUsers', 'GET');
    const fonctionnalites = await getLoader('admin/getFonctionnalites', 'GET');
    if (members.error || users.error || fonctionnalites.error)
        return { error: { message: 'Erreur lors du chargement de la page' } };
    return { members: members.info, users: users.info, fonctionnalites: fonctionnalites.info };
}

export async function action({ request, parms }) {
    const formData = await request.formData();
    switch (formData.get('actionMethod')) {
        case ACTION_DELETE_MEMBER:
            return deleteMember({ idMember: formData.get('id') });
        case ACTION_DELETE_USER:
            return deleteUser({ idUser: formData.get('id') });
        case ACTION_DELETE_FONCTIONNALITE:
            return deleteFonctionnalite({ idFonctionnalite: formData.get('id') });
        case ACTION_SET_ACTIVE_FONCTIONNALITE:
            return setActiveFonctionnalite({
                idFonctionnalite: formData.get('id'),
                isActive: formData.get('isActive'),
            });
        default:
            return { error: { message: 'Action inconnue' } };
    }
}

async function deleteMember({ idMember }) {
    return await deleteAction({ idMember }, 'admin/deleteMember');
}

async function deleteUser({ idUser }) {
    return await deleteAction({ idUser }, 'admin/deleteUser');
}

async function deleteFonctionnalite({ idFonctionnalite }) {
    return await deleteAction({ idFonctionnalite }, 'admin/deleteFonctionnalite');
}

async function setActiveFonctionnalite({ isActive, idFonctionnalite }) {
    console.log(isActive, idFonctionnalite);
    return await modifyAction({ isActive, idFonctionnalite }, 'admin/setFonctionnaliteActive');
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
