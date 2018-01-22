import ActionTypes from '../constants/ActionTypes';

const modal = function(state = false, action) {
    switch (action.type) {
        case ActionTypes.CHANGE_MODAL:
            return !state;

        default:
            return state;
    }
};

export default modal;
