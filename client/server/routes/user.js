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
import { idMemberValidator } from '../validator/id_validator.js';
import { loginValidator } from '../validator/login_validator.js';
import {
    memberHealthValidator,
    memberPerformanceValidator,
    memberValidator,
} from '../validator/member_validator.js';

const router = Router();

export function userRoute(app) {
    // Create user/ member/ healthMember/ performanceMember
    app.post('/api/createUser', loginValidator(), createUserController);
    app.post('/api/createMember', memberValidator(), createMemberController);
    app.post('/api/createHealthMember', memberHealthValidator(), createHealthMemberController);
    app.post(
        '/api/createPerformanceMember',
        memberPerformanceValidator(),
        createPerformanceMemberController
    );

    // Update user/ member/ healthMember/ performanceMember
    app.put('/api/updateMember', memberValidator(), updateMemberController);
    app.put('/api/updateHealthMember', memberHealthValidator(), updateHealthMemberController);
    app.put(
        '/api/updatePerformanceMember',
        memberPerformanceValidator(),
        updatePerformanceMemberController
    );
    app.put(
        '/api/updateMemberAllField',
        memberValidator(),
        memberHealthValidator(),
        memberPerformanceValidator(),
        updateMemberAllFieldController
    );

    // Get user/ member/ healthMember/ performanceMember
    app.get('/api/getMember', idMemberValidator(), getMemberController);
}
