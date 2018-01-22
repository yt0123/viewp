import ActionTypes from '../constants/ActionTypes';

const visibility = function(state = false, action) {
    switch (action.type) {
        case ActionTypes.CHANGE_VISIBILITY:
            return !state;

        default:
            return state;
    }
};

export default visibility;
