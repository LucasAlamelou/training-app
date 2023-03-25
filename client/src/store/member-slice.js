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
    return {
        memberState: {},
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
        state.memberState = member;
    }
    /**
     * Add Training to the list
     * @param {*} state
     * @param {*} action
     */
    function modifyMember(state, action) {
        //const { payload } = action;
        /*console.log(payload);
        const data = payload.fieldModify;
        let field;
        let value;
        for (const [key, value1] of Object.entries(data)) {
            field = key;
            value = value1;
        }
        console.log(field);*/
        // TODO : modifier le state avec le champ et la valeur
        //state.memberState[field] = value;
    }

    /**
     * Remove all Training
     * @param {*} state
     * @param {*} action
     */
    function removeMember(state, action) {
        state.memberState = {};
    }
}
