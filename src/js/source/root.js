import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import reducer from './reducers';
import bind from './middlewares/bind';

const store = createStore(reducer, applyMiddleware(bind));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
