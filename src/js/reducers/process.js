import ActionTypes from '../constants/ActionTypes';

const process = function(state = { completed: 100, isRunning: false }, action) {
    switch (action.type) {
        case ActionTypes.RUN_PROCESS:
            return { completed: 0, isRunning: true };

        case ActionTypes.UPDATE_PROCESS:
            return { completed: action.completed, isRunning: action.completed !== 100 };

        default:
            return state;
    }
};

export default process;
