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
    getMemberController,
} from '../controllers/user.js';

const router = Router();

export function userRoute(app) {
    // Create user/ member/ healthMember/ performanceMember
    app.post('/api/createUser', createUserController);
    app.post('/api/createMember', createMemberController);
    app.post('/api/createHealthMember', createHealthMemberController);
    app.post('/api/createPerformanceMember', createPerformanceMemberController);

    // Update user/ member/ healthMember/ performanceMember
    app.post('/api/updateMember', updateMemberController);
    app.post('/api/updateHealthMember', updateHealthMemberController);
    app.post('/api/updatePerformanceMember', updatePerformanceMemberController);

    // Delete user
    app.delete('/api/deleteUser', deleteUserController);

    // Get user/ member/ healthMember/ performanceMember
    app.get('/api/getMember', getMemberController);
}
