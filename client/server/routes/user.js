import { Router } from 'express';
import {
    createUserController,
    createHealthMemberController,
    createMemberController,
    createPerformanceMemberController,
    updateMemberController,
    updateHealthMemberController,
    updatePerformanceMemberController,
    getMemberController,
    updateMemberAllFieldController,
} from '../controllers/user.js';

const router = Router();

export function userRoute(app) {
    // Create user/ member/ healthMember/ performanceMember
    app.post('/api/createUser', createUserController);
    app.post('/api/createMember', createMemberController);
    app.post('/api/createHealthMember', createHealthMemberController);
    app.post('/api/createPerformanceMember', createPerformanceMemberController);

    // Update user/ member/ healthMember/ performanceMember
    app.put('/api/updateMember', updateMemberController);
    app.put('/api/updateHealthMember', updateHealthMemberController);
    app.put('/api/updatePerformanceMember', updatePerformanceMemberController);
    app.put('/api/updateMemberAllField', updateMemberAllFieldController);

    // Get user/ member/ healthMember/ performanceMember
    app.get('/api/getMember', getMemberController);
}
