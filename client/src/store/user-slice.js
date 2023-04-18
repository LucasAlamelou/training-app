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
    const user = localStorage.getItem('Application_Training_User');
    const member = localStorage.getItem('Application_Training_Member');
    const token = localStorage.getItem('Application_Training_Token');
    const roles = localStorage.getItem('Application_Training_Roles');
    const email = localStorage.getItem('Application_Training_Email');
    return {
        user: user,
        member: member,
        isConnected: user === null && token === null && member === null ? false : true,
        token: token,
        roles: roles,
        email: email,
    };
}

function userConnectedReducer() {
    return {
        addUserConnected,
        removeUserConnected,
        setUserNotConnected,
    };
    function addUserConnected(state, action) {
        const { payload } = action;
        const user = payload.user;
        const member = payload.member;
        const token = payload.token;
        const roles = payload.roles;
        const email = payload.email;
        window.localStorage.setItem('Application_Training_Token', token);
        window.localStorage.setItem('Application_Training_Member', member);
        window.localStorage.setItem('Application_Training_User', user);
        window.localStorage.setItem('Application_Training_Roles', roles);
        window.localStorage.setItem('Application_Training_Email', email);
        state.user = user;
        state.token = token;
        state.member = member;
        state.isConnected = true;
        state.roles = roles;
        state.email = email;
    }

    function removeUserConnected(state, action) {
        window.localStorage.removeItem('Application_Training_User');
        window.localStorage.removeItem('Application_Training_Token');
        window.localStorage.removeItem('Application_Training_Member');
        window.localStorage.removeItem('Application_Training_Member_Connected');
        window.localStorage.removeItem('Application_Training_Roles');
        window.localStorage.removeItem('Application_Training_Email');
        state.user = null;
        state.token = null;
        state.member = null;
        state.isConnected = false;
    }
    function setUserNotConnected(state, action) {
        state.isConnected = false;
    }
}
