import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import setConfigurationStorage from './Store/Reducers/configuration-store';
import configuredData from './Store/Reducers/configuration-input-store';

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

var loggerMiddleware = (store) => (next) => (action) => {
    console.log(action);
    console.log(store.getState());
    return next(action);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

var combinedStore = combineReducers({
    setConfigurationStorage: setConfigurationStorage,
    getConfiguredData: configuredData
})
var reduxStore = createStore(combinedStore, composeEnhancers(
    applyMiddleware(loggerMiddleware)
));

ReactDOM.render(<Provider store={reduxStore}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
