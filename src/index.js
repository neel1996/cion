import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import setConfigurationStorage from './Store/Reducers/configuration-storage';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

var reduxStore = createStore(setConfigurationStorage);

ReactDOM.render(<Provider store={reduxStore}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
