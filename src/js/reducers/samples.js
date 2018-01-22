import ActionTypes from '../constants/ActionTypes';
import AppDefaults from '../constants/AppDefaults';

const samples = function (state = [], action) {
    switch (action.type) {
        case ActionTypes.ADD_SOURCE:
            return [
                ...state,
                {
                    id: state.length,
                    scale: 'none',
                    network: 'none',
                    track: 'none',
                    refine: 'none'
                }
            ];

        case ActionTypes.CHANGE_SAMPLE:
            return state.map(function(sample) {
                return sample.id === action.id ? Object.assign({}, sample, action.data) : sample ;
            });

        default:
            return state;
    }
};

export default samples;
