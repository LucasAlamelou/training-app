import { Router } from 'express';
import {
    getUsersAdminControllers,
    getMembersAdminControllers,
    getCountTrainingByMemberIdControllers,
    addMemberAdminControllers,
    getFonctionnalitesControllers,
    updateFonctionnaliteControllers,
    addFonctionnaliteControllers,
    setFonctionnaliteActiveControllers,
    deleteFonctionnaliteControllers,
    getFonctionnaliteByIdControllers,
} from '../controllers/admin.js';
import { deleteUserController, getUserAndMemberAllController } from '../controllers/user.js';
import { idMemberValidator, idFonctionnaliteValidator } from '../validator/id_validator.js';
import { loginValidator } from '../validator/login_validator.js';
import { memberValidator } from '../validator/member_validator.js';
import {
    fonctionnaliteValidator,
    fonctionnaliteActiveValidator,
} from '../validator/fonctionnalite_validator.js';

const router = Router();

export function adminRoute(app) {
    // get routes
    app.get('/api/admin/getUsers', getUsersAdminControllers);
    app.get('/api/admin/getMembers', getMembersAdminControllers);
    app.get(
        '/api/admin/getCountTrainingByMemberId',
        idMemberValidator(),
        getCountTrainingByMemberIdControllers
    );
    app.get('/api/admin/getUserAndMemberAll', getUserAndMemberAllController);
    app.get('/api/admin/getFonctionnalites', getFonctionnalitesControllers);
    app.get(
        '/api/admin/getFonctionnaliteById',
        idFonctionnaliteValidator(),
        getFonctionnaliteByIdControllers
    );

    // post routes
    // app.post('/api/admin/postUsers', postUsersAdminControllers);
    // app.post('/api/admin/postUserAndMemberAll', getUserAndMemberAllController)
    app.post(
        '/api/admin/addMember',
        memberValidator(),
        loginValidator(),
        addMemberAdminControllers
    );
    app.post('/api/admin/addFonctionnalite', addFonctionnaliteControllers);

    // put routes
    app.put(
        '/api/admin/updateFonctionnalite',
        idFonctionnaliteValidator(),
        fonctionnaliteValidator(),
        updateFonctionnaliteControllers
    );
    app.put(
        '/api/admin/setFonctionnaliteActive',
        idFonctionnaliteValidator(),
        fonctionnaliteActiveValidator(),
        setFonctionnaliteActiveControllers
    );

    // Delete user
    app.delete('/api/admin/deleteUser', deleteUserController);
    app.delete(
        '/api/admin/deleteFonctionnalite',
        idFonctionnaliteValidator(),
        deleteFonctionnaliteControllers
    );
}
