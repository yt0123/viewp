var { combineReducers } = require('redux');
var sources = require('./sources');
var config = require('./config');
var visibility = require('./visibility');
var modal = require('./modal');

var rootReducer = combineReducers({
    sources,
    config,
    visibility,
    modal
});

module.exports =  rootReducer;
