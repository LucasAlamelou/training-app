import React from 'react';
import { redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getLoader } from '../util/Loader.js';
import { modifyAction, addAction } from '../util/Action.js';
import { ACTION_MODIFY_FONCTIONNALITE, ACTION_ADD_FONCTIONNALITE } from '../pages/AdminPage.js';
import { FonctionnaliteModifyOrAdd } from '../components/ListFonctionnaliteModify.js';

export async function loader({ params }) {
    if (params.idFonctionnalite === 'add') {
        return null;
    }
    const url = 'admin/getFonctionnaliteById';
    const method = 'GET';
    const param = {
        idFonctionnalite: params.idFonctionnalite,
    };
    const result = await getLoader(url, method, param);
    if (!result.info) {
        return result;
    }
    return result.info;
}

export async function action({ request, parms }) {
    const formData = await request.formData();
    let donnesForm = {
        idFonctionnalite: formData.get('id'),
        description: formData.get('description'),
        name: formData.get('name'),
    };
    console.log('donnesForm', donnesForm);
    switch (formData.get('actionMethod')) {
        case ACTION_MODIFY_FONCTIONNALITE:
            const resultModify = await modifyFonctionnalite(donnesForm);
            if (resultModify?.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: resultModify.error.message,
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Fonctionnalité modifiée',
                    text: 'La fonctionnalité a été modifiée avec succès',
                });
                redirect('/admin');
            }
            break;

        case ACTION_ADD_FONCTIONNALITE:
            const resultAdd = await addFonctionnalite(donnesForm);
            if (resultAdd?.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: resultAdd.error.message,
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Fonctionnalité ajoutée',
                    text: 'La fonctionnalité a été ajoutée avec succès',
                });
                redirect('/admin');
            }
            break;
        default:
            break;
    }

    return null;
}

async function modifyFonctionnalite({ idFonctionnalite, description, name }) {
    return await modifyAction(
        { idFonctionnalite, description, name },
        'admin/updateFonctionnalite'
    );
}

async function addFonctionnalite({ description, name }) {
    return await addAction({ description, name }, 'admin/addFonctionnalite');
}

export const AdminFonctionnalite = () => {
    return (
        <>
            <FonctionnaliteModifyOrAdd isAddOrModify={true} />
        </>
    );
};
