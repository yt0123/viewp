import ActionTypes from '../constants/ActionTypes';
import AppDefaults from '../constants/AppDefaults';

const config = function (state = AppDefaults, action) {
    switch (action.type) {

    case ActionTypes.CHANGE_ALPHA:
        return Object.assign({}, state, {
            alpha: action.data
        });

    default:
        return state;

    }
};

export default config;
