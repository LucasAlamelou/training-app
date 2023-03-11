import { Router } from 'express';
import {
    createUserController,
    createHealthMemberController,
    createMemberController,
    createPerformanceMemberController,
} from '../controllers/user.js';

const router = Router();

export function userRoute(app) {
    app.post('/createUser', createUserController);
    app.post('/createMember', createMemberController);
    app.post('/createHealthMember', createHealthMemberController);
    app.post('/createPerformanceMember', createPerformanceMemberController);
}
