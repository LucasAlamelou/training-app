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
    const tokenEncrypt = localStorage.getItem('Application_Training_Token_Encrypt');
    const roles = localStorage.getItem('Application_Training_Roles');
    const email = localStorage.getItem('Application_Training_Email');
    return {
        user: user,
        member: member,
        isConnected: user === null && tokenEncrypt === null && member === null ? false : true,
        tokenEncrypt: tokenEncrypt,
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
        const roles = payload.roles;
        const email = payload.email;
        const tokenEncrypt = payload.tokenEncrypt;
        window.localStorage.setItem('Application_Training_Member', member);
        window.localStorage.setItem('Application_Training_User', user);
        window.localStorage.setItem('Application_Training_Roles', roles);
        window.localStorage.setItem('Application_Training_Email', email);
        window.localStorage.setItem('Application_Training_Token_Encrypt', tokenEncrypt);
        state.user = user;
        state.tokenEncrypt = tokenEncrypt;
        state.member = member;
        state.isConnected = true;
        state.roles = roles;
        state.email = email;
    }

    function removeUserConnected(state, action) {
        window.localStorage.removeItem('Application_Training_User');
        window.localStorage.removeItem('Application_Training_Member');
        window.localStorage.removeItem('Application_Training_Member_Connected');
        window.localStorage.removeItem('Application_Training_Roles');
        window.localStorage.removeItem('Application_Training_Email');
        window.localStorage.removeItem('Application_Training_Token_Encrypt');
        state.user = null;
        state.member = null;
        state.isConnected = false;
        state.tokenEncrypt = null;
    }
    function setUserNotConnected(state, action) {
        state.isConnected = false;
    }
}
