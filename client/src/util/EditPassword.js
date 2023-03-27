import Swal from 'sweetalert2';
import { ActionFormMemberPassword } from './ActionForm.js';

export const onModifyPassword = (e, user) => {
    const html = `
    <div class="swal2-input-group">
        <label class="swal2-label" for="swal2-input">Mot de passe actuel</label>
        <input class="swal2-input" type="password" id="swal2-input-currentPassword" name="password" value="">
    </div>
    <div class="swal2-input-group">
        <label class="swal2-label" for="swal2-input">Nouveau mot de passe</label>
        <input class="swal2-input" type="password" id="swal2-input-newPassword" name="newPassword" value="">
    </div>
    <div class="swal2-input-group">
        <label class="swal2-label" for="swal2-input">Confirmation du nouveau mot de passe</label>
        <input class="swal2-input" type="password" id="swal2-input-confirmNewPassword" name="newPasswordConfirm" value="">
    </div>`;
    Swal.fire({
        title: 'Modification du champ : mot de passe',
        html: html,
        focusConfirm: false,
        showCancelButton: true,
        cancelButtonText: 'Annuler',
        confirmButtonText: 'Modifier',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            let data = {
                email: user?.email,
            };
            document.querySelectorAll('.swal2-input').forEach((input) => {
                data[input.name] = input.value;
            });
            const result = await ActionFormMemberPassword(data);
            if (result?.error) {
                Swal.showValidationMessage(`${result.error.message}`);
                return result;
            } else {
                if (result?.message) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Modification réussie',
                        text: `Le mot de passe a bien été modifié.`,
                        showConfirmButton: false,
                        timer: 2500,
                    });
                    return result;
                }
            }
        },
        allowOutsideClick: () => !Swal.isLoading(),
    });
};
