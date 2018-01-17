import ActionTypes from '../constants/ActionTypes';

const process = function(state = { completed: 100, isRunning: false }, action) {
    switch (action.type) {
        case ActionTypes.RUN_PROCESS:
            return { completed: 0, isRunning: false };

        case ActionTypes.DONE_PROCESS:
            return { completed: 100, isRunning: true };

        case ActionTypes.CHANGE_PROCESS:
            return Object.assign({}, state, { completed: action.completed });

        default:
            return state;
    }
};

export default process;
