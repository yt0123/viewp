var ActionTypes = require('../constants/ActionTypes');

var Actions = {
    addSource: function(text, body, extra) {
        return {
            type: ActionTypes.ADD_SOURCE,
            text,
            body,
            extra
        };
    },
    deleteSource: function(id) {
        return {
            type: ActionTypes.DELETE_SOURCE,
            id
        };
    },
    checkSource: function(id) {
        return {
            type: ActionTypes.CHECK_SOURCE,
            id
        };
    },
    stapleSource: function(id, data) {
        return {
            type: ActionTypes.STAPLE_SOURCE,
            id,
            data
        };
    },
    colorSource: function(id, data) {
        return {
            type: ActionTypes.COLOR_SOURCE,
            id,
            data
        };
    },
    changeAlpha: function(data) {
        return {
            type: ActionTypes.CHANGE_ALPHA,
            data
        };
    },
    changeVisibility: function() {
        return {
            type: ActionTypes.CHANGE_VISIBILITY
        };
    },
    changeModal: function() {
        return {
            type: ActionTypes.CHANGE_MODAL
        };
    }
};

module.exports = Actions;
