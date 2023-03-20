import { configureStore } from '@reduxjs/toolkit';

import { usersReducer } from './user-slice.js';

export * from './user-slice.js';

export const store = configureStore({
    reducer: {
        user: usersReducer,
    },
});
