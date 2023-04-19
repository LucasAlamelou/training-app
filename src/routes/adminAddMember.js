import React from 'react';
import { redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FormRegister } from '../components/FormRegister.js';
import { ActionFormLoginRegister } from '../util/ActionForm.js';

export function loader({ request }) {
    let data = {};
    return data;
}

export async function action({ param, request }) {
    let formData = await request.formData();
    const result = await ActionFormLoginRegister(formData, 'admin/addMember', 'post');
    if (result?.token || result?.user || result?.member) {
        const member = result?.member;
        Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: `Utilisateur ${member?.firstName} ${member?.lastName} ajouté avec succès avec l'id membre ${member?.memberId}`,
            timer: 5000,
        });
        return redirect('/admin');
    }
    return result;
}

export const AdminAddMember = () => {
    return (
        <>
            <FormRegister isAdmin={true} />
        </>
    );
};
