import { createSlice } from '@reduxjs/toolkit';

// create reducer
const name = 'member';
const initialState = createInitialState();
const reducers = userConnectedReducer();
const slice = createSlice({ name, initialState, reducers });

export const memberActions = { ...slice.actions };
export const memberReducers = slice.reducer;

// implementation
function createInitialState() {
    const memberState = window.localStorage.getItem('Application_Training_Member_Connected');
    return {
        memberState: memberState ? JSON.parse(memberState) : {},
    };
}

function userConnectedReducer() {
    return {
        addMember,
        modifyMember,
        removeMember,
    };
    /**
     * Add all Training to the list
     * @param {*} state
     * @param {*} action
     */
    function addMember(state, action) {
        const { payload } = action;
        const member = payload.member;
        window.localStorage.setItem(
            'Application_Training_Member_Connected',
            JSON.stringify(member)
        );
        state.memberState = { ...state.memberState, ...member };
    }
    /**
     * Add Training to the list
     * @param {*} state
     * @param {*} action
     */
    function modifyMember(state, action) {
        const { payload } = action;
        const data = payload.fieldModify;
        let field;
        let value;
        for (const [key, value1] of Object.entries(data)) {
            field = key;
            value = value1;
        }
        state.memberState = { ...state.memberState, [field]: value };
        window.localStorage.setItem(
            'Application_Training_Member_Connected',
            JSON.stringify(state.memberState)
        );
    }

    /**
     * Remove all Training
     * @param {*} state
     * @param {*} action
     */
    function removeMember(state, action) {
        window.localStorage.removeItem('Application_Training_Member_Connected');
        state.memberState = {};
    }
}
