import ActionTypes from '../constants/ActionTypes';
import SampleMethods from '../constants/SampleMethods';

const samples = function (state = [], action) {
    switch (action.type) {
        case ActionTypes.ADD_SOURCE:
            return [
                ...state,
                {
                    id: state.length,
                    scale: {
                        assembly: SampleMethods.NONE.value,
                    },
                    subset: {
                        assembly: SampleMethods.NONE.value,
                    },
                    link: {
                        assembly: SampleMethods.NONE.value,
                    },
                    track: {
                        assembly: SampleMethods.NONE.value,
                        subAssembly: SampleMethods.NONE.value
                    },
                    orient: {
                        assembly: SampleMethods.NONE.value,
                    }
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
