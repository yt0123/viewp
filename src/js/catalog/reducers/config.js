import ActionTypes from '../constants/ActionTypes';
import AppDefaults from '../constants/AppDefaults';

const config = function (state = AppDefaults, action) {
    switch (action.type) {
        case ActionTypes.CHANGE_RGB:
            return Object.assign({}, state, { rgb: action.data });

        case ActionTypes.CHANGE_ALPHARANGE:
            return Object.assign({}, state, { alphaRange: action.data });

        case ActionTypes.CHANGE_STROKECOLOR:
            return Object.assign({}, state, { strokeColor: action.data });

        case ActionTypes.CHANGE_TEXTSCALE:
            return Object.assign({}, state, { textScale: action.data });

        case ActionTypes.CHANGE_OUTLINECOLOR:
            return Object.assign({}, state, { outlineColor: action.data });

        default:
            return state;
    }
};

export default config;
