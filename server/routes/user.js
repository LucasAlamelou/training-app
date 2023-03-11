import { Router } from 'express';
import {
    createUserController,
    createHealthMemberController,
    createMemberController,
    createPerformanceMemberController,
    updateMemberController,
    updateHealthMemberController,
    updatePerformanceMemberController,
    deleteUserController,
} from '../controllers/user.js';

const router = Router();

export function userRoute(app) {
    // Create user/ member/ healthMember/ performanceMember
    app.post('/createUser', createUserController);
    app.post('/createMember', createMemberController);
    app.post('/createHealthMember', createHealthMemberController);
    app.post('/createPerformanceMember', createPerformanceMemberController);

    // Update user/ member/ healthMember/ performanceMember
    app.post('/updateMember', updateMemberController);
    app.post('/updateHealthMember', updateHealthMemberController);
    app.post('/updatePerformanceMember', updatePerformanceMemberController);

    // Delete user
    app.delete('/deleteUser', deleteUserController);
}
