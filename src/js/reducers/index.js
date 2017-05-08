import { combineReducers } from 'redux';
import sources from './sources';
import config from './config';
import visibility from './visibility';
import modal from './modal';

const rootReducer = combineReducers({
    sources,
    config,
    visibility,
    modal
});

export default rootReducer;
