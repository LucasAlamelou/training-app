import { Router } from 'express';
import {
    getUsersAdminControllers,
    getMembersAdminControllers,
    getCountTrainingByMemberIdControllers,
} from '../controllers/admin.js';
import { deleteUserController } from '../controllers/user.js';

const router = Router();

export function adminRoute(app) {
    // get routes
    app.get('/api/admin/getUsers', getUsersAdminControllers);
    app.get('/api/admin/getMembers', getMembersAdminControllers);
    app.get('/api/admin/getCountTrainingByMemberId', getCountTrainingByMemberIdControllers);

    // post routes
    // app.post('/api/admin/postUsers', postUsersAdminControllers);
    // app.post('/api/admin/postMembers', postMembersAdminControllers);

    // Delete user
    app.delete('/api/admin/deleteUser', deleteUserController);
}
