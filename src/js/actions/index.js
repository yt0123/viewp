import ActionTypes from '../constants/ActionTypes';

const Actions = {
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
    changeRgb: function(data) {
        return {
            type: ActionTypes.CHANGE_RGB,
            data
        };
    },
    changeAlphaRange: function(data) {
        return {
            type: ActionTypes.CHANGE_ALPHARANGE,
            data
        };
    },
    changeStrokeColor: function(data) {
        return {
            type: ActionTypes.CHANGE_STROKECOLOR,
            data
        };
    },
    changeTextScale: function(data) {
        return {
            type: ActionTypes.CHANGE_TEXTSCALE,
            data
        };
    },
    changeOutlineColor: function(data) {
        return {
            type: ActionTypes.CHANGE_OUTLINECOLOR,
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

export default Actions;
