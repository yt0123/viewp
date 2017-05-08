import ActionTypes from '../constants/ActionTypes';

const defaultConfig = {
    alpha: [0.3, 0.7],
    initColor: [0,0,255],
    strokeColor: [170,170,170],
    textAlpha: 0.6,
    outlineColor: [255,255,255]
};

const config = function (state = defaultConfig, action) {
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
