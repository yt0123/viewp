import { combineReducers } from 'redux';
import sources from './sources';
import samples from './samples';
import config from './config';
import visibility from './visibility';
import modal from './modal';
import process from './process';

const rootReducer = combineReducers({
    sources,
    samples,
    config,
    visibility,
    modal,
    process
});

export default rootReducer;
