var ActionTypes = require('../constants/ActionTypes');

var modal = function(state = false, action) {
    switch (action.type) {

    case ActionTypes.CHANGE_MODAL:
        return !state;

    default:
        return state;

    }
};

module.exports = modal;
