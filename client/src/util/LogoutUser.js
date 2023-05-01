import Swal from 'sweetalert2';
import { redirect } from 'react-router-dom';
import { authActions, memberActions } from '../store/index.js';

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
        dispatch(memberActions.removeMember({}));
        return redirect('/login');
    }
};

export const setUserNotConnected = (data, dispatch) => {
    if (data.error?.code === 401) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: "Erreur d'authentification",
            showConfirmButton: false,
            timer: 2000,
        });
        dispatch(authActions.setUserNotConnected({}));
        dispatch(memberActions.removeMember({}));
        //return Navigate('/login');
    }
};
