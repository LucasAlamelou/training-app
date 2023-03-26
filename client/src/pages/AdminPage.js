import React from 'react';
import { useActionData, useLoaderData, useSubmit } from 'react-router-dom';
import { TableList } from '../components/TableList.js';
import Swal from 'sweetalert2';

export const ACTION_DELETE_MEMBER = 'deleteMember';
export const ACTION_DELETE_USER = 'deleteUser';

export const AdminPage = () => {
    const { members, users } = useLoaderData();
    const submit = useSubmit();
    const actionData = useActionData();

    if (actionData?.error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: actionData.error.message,
            timer: 3000,
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

        console.log('userDelete', id);
    };

    const onClickDeleteMember = (id) => {
        onClickDelete(id, ACTION_DELETE_MEMBER);
    };
    const onClickDeleteUser = (id) => {
        onClickDelete(id, ACTION_DELETE_USER);
    };
    return (
        <>
            <TableList isMember={true} members={members} onDeleteAction={onClickDeleteMember} />
            <TableList isUser={true} users={users} onDeleteAction={onClickDeleteUser} />
        </>
    );
};
