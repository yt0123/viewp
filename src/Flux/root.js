var React = require('react');
var ReactDOM = require('react-dom');
var { createStore } = require('redux');
var { Provider } = require('react-redux');
var App = require('./containers/App');
var reducer = require('./reducers');

var store = createStore(reducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
