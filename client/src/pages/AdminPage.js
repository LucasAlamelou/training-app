import React from 'react';
import { useActionData, useLoaderData, useSubmit, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TableListAdmin } from '../components/TableListAdmin.js';
import Swal from 'sweetalert2';
import { ButtonMember } from '../components/ButtonMember.js';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { setUserNotConnected } from '../util/LogoutUser.js';

export const ACTION_DELETE_MEMBER = 'deleteMember';
export const ACTION_DELETE_USER = 'deleteUser';
export const ACTION_GET_MEMBER = 'getMember';

export const ACTION_MODIFY_FONCTIONNALITE = 'modifyFonctionnalite';
export const ACTION_ADD_FONCTIONNALITE = 'addFonctionnalite';
export const ACTION_DELETE_FONCTIONNALITE = 'deleteFonctionnalite';
export const ACTION_SET_ACTIVE_FONCTIONNALITE = 'setActiveFonctionnalite';

export const AdminPage = () => {
    const data = useLoaderData();
    const dispatch = useDispatch();
    const { members, users, fonctionnalites } = useLoaderData();
    const submit = useSubmit();
    const actionData = useActionData();

    useEffect(() => {
        setUserNotConnected(data, dispatch);
    }, [data, dispatch]);

    if (actionData?.error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: actionData.error.message,
        });
    }
    if (actionData?.infoChanged) {
        Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: actionData.infoChanged.message,
            timer: 3000,
        });
    }
    const onClickDelete = (id, action) => {
        Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: 'Vous ne pourrez pas revenir en arrière !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer !',
        }).then((result) => {
            if (result.isConfirmed) {
                submit({ id: id, actionMethod: action }, { method: 'delete', action: 'admin' });
            }
        });
    };

    const onClickDeleteMember = (id) => {
        onClickDelete(id, ACTION_DELETE_MEMBER);
    };
    const onClickDeleteUser = (id) => {
        onClickDelete(id, ACTION_DELETE_USER);
    };
    const onClickDeleteFonctionnalite = (id) => {
        onClickDelete(id, ACTION_DELETE_FONCTIONNALITE);
    };

    /*
    const handleChange = (value) => {
        console.log('value', value);
        submit({ id: value.id, actionMethod: ACTION_MODIFY_FONCTIONNALITE, texte: value.texte }, { method: 'post', action: 'admin' });
    };
    */

    return (
        <>
            <h1>Page d'administration</h1>
            <>
                <Link to={'/admin/add-membre'}>
                    <ButtonMember
                        label={'Ajouter un utilisateur'}
                        favicon={faUserPlus}
                        functionClick={() => {}}
                    />
                </Link>
                <Link to={'/admin/fonctionnalite/edit/add'}>
                    <ButtonMember
                        label={'Ajouter une fonctionnalité'}
                        favicon={faUserPlus}
                        functionClick={() => {}}
                    />
                </Link>
                <TableListAdmin
                    isMember={true}
                    members={members}
                    onDeleteAction={onClickDeleteMember}
                />
                <TableListAdmin isUser={true} users={users} onDeleteAction={onClickDeleteUser} />
                <TableListAdmin
                    isFonctionnalite={true}
                    fonctionnalites={fonctionnalites}
                    onDeleteAction={onClickDeleteFonctionnalite}
                />
            </>
        </>
    );
};
