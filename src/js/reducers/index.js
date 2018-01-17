import { combineReducers } from 'redux';
import sources from './sources';
import config from './config';
import visibility from './visibility';
import modal from './modal';
import process from './process';

const rootReducer = combineReducers({
    sources,
    config,
    visibility,
    modal,
    process
});

export default rootReducer;
