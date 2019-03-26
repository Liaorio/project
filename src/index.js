import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root/Root';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>

, document.getElementById('root'));

serviceWorker.unregister();
