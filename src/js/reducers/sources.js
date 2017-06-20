import ActionTypes from '../constants/ActionTypes';
import AppDefaults from '../constants/AppDefaults';

const sources = function (state = [], action) {
    switch (action.type) {
        case ActionTypes.ADD_SOURCE:
            return [
                ...state,
                {
                    id: state.length,
                    name: action.text,
                    body: action.body,
                    extra: action.extra,
                    color: AppDefaults.rgb,
                    staple: action.extra[0],
                    invalid: false
                }
            ];

        case ActionTypes.DELETE_SOURCE:
            return state.filter(function(source) { return source.id !== action.id; }).map(function(source, index) {
                return Object.assign({}, source, { id: index });
            })

        case ActionTypes.CHECK_SOURCE:
            return state.map(function(source) {
                return source.id === action.id ? Object.assign({}, source, { invalid: !source.invalid }) : source ;
            });

        case ActionTypes.STAPLE_SOURCE:
            return state.map(function(source) {
                return source.id === action.id ? Object.assign({}, source, { staple: action.data }) : source ;
            });

        case ActionTypes.COLOR_SOURCE:
            return state.map(function(source) {
                return source.id === action.id ? Object.assign({}, source, { color: action.data }) : source ;
            });

        default:
            return state;
    }
};

export default sources;
