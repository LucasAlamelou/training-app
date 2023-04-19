import { createSlice } from '@reduxjs/toolkit';

// create reducer
const name = 'training_member';
const initialState = createInitialState();
const reducers = userConnectedReducer();
const slice = createSlice({ name, initialState, reducers });

export const trainingActions = { ...slice.actions };
export const trainingReducers = slice.reducer;

// implementation
function createInitialState() {
    return {
        trainingListState: [],
    };
}

function userConnectedReducer() {
    return {
        addAllTraining,
        addTraining,
        removeTrainingById,
        removeAllTraining,
    };
    /**
     * Add all Training to the list
     * @param {*} state
     * @param {*} action
     */
    function addAllTraining(state, action) {
        const { payload } = action;
        state.trainingListState = payload.training;
    }
    /**
     * Add Training to the list
     * @param {*} state
     * @param {*} action
     */
    function addTraining(state, action) {
        const { payload } = action;
        const training = payload.training;
        state.trainingListState.push(training);
    }

    /**
     * Remove Training by id
     * @param {*} state
     * @param {*} action
     */
    function removeTrainingById(state, action) {
        const { payload } = action;
        const id = payload.id;
        const index = state.trainingListState.findIndex((x) => x.idTraining === id);
        state.trainingListState.splice(index, 1);
    }
    /**
     * Remove all Training
     * @param {*} state
     * @param {*} action
     */
    function removeAllTraining(state, action) {
        state.trainingListState = [];
    }
}
