import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import { authActions } from '../store/index.js';

export const logoutUser = (data, dispatch) => {
    if (data.error?.code === 401) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Vous devez être connecté pour accéder à cette page',
            showConfirmButton: false,
            timer: 2000,
        });
        dispatch(authActions.removeUserConnected({}));
        return Navigate('/login');
    }
};
