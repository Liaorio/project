import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root/Root';
import * as serviceWorker from './serviceWorker';
import configureStore from './configureStore'
import { BrowserRouter as Router} from "react-router-dom";
import { Provider } from 'react-redux'

const store = configureStore();

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <Root />
        </Provider>
    </Router>

, document.getElementById('root'));

serviceWorker.unregister();
