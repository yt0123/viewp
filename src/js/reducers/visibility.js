var ActionTypes = require('../constants/ActionTypes');

var visibility = function(state = false, action) {
    switch (action.type) {

    case ActionTypes.CHANGE_VISIBILITY:
        return !state;

    default:
        return state;

    }
};

module.exports = visibility;
