import { createSlice } from '@reduxjs/toolkit';

// create reducer
const name = 'user-connected';
const initialState = createInitialState();
const reducers = userConnectedReducer();
const slice = createSlice({ name, initialState, reducers });

export const authActions = { ...slice.actions };
export const usersReducer = slice.reducer;

// implementation
function createInitialState() {
    return {
        user: localStorage.getItem('Application_Training_User'),
        member: localStorage.getItem('Application_Training_Member'),
        isConnected: false,
        token: localStorage.getItem('Application_Training_Token'),
    };
}

function userConnectedReducer() {
    return {
        addUserConnected,
        removeUserConnected,
    };
    function addUserConnected(state, action) {
        const { payload } = action;
        const user = payload.user;
        const member = payload.member;
        const token = payload.token;
        const isConnected = payload.isConnected;
        window.localStorage.setItem('Application_Training_Token', token);
        window.localStorage.setItem('Application_Training_Member', member);
        window.localStorage.setItem('Application_Training_User', user);
        state.user = user;
        state.token = token;
        state.member = member;
        state.isConnected = isConnected;
    }

    function removeUserConnected(state, action) {
        window.localStorage.removeItem('Application_Training_User');
        window.localStorage.removeItem('Application_Training_Token');
        window.localStorage.removeItem('Application_Training_Member');
        state.user = null;
        state.token = null;
        state.isConnected = false;
    }
}