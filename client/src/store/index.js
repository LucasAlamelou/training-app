import { configureStore } from '@reduxjs/toolkit';

import { usersReducer } from './user-slice.js';
import { trainingReducers } from './training-slice.js';
import { memberReducers } from './member-slice.js';

export * from './user-slice.js';
export * from './training-slice.js';
export * from './member-slice.js';

export const store = configureStore({
    reducer: {
        user: usersReducer,
        training: trainingReducers,
        member: memberReducers,
    },
});
