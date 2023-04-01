import { Router } from 'express';
import {
    getUsersAdminControllers,
    getMembersAdminControllers,
    getCountTrainingByMemberIdControllers,
    addMemberAdminControllers,
} from '../controllers/admin.js';
import { deleteUserController, getUserAndMemberAllController } from '../controllers/user.js';
import { idMemberValidator } from '../validator/id_validator.js';
import { loginValidator } from '../validator/login_validator.js';
import { memberValidator } from '../validator/member_validator.js';

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

    // post routes
    // app.post('/api/admin/postUsers', postUsersAdminControllers);
    app.post(
        '/api/admin/addMember',
        memberValidator(),
        loginValidator(),
        addMemberAdminControllers
    );
    // app.post('/api/admin/postUserAndMemberAll', getUserAndMemberAllController)

    // Delete user
    app.delete('/api/admin/deleteUser', deleteUserController);
}
