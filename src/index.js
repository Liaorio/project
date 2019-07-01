import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root/Root';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'

import { LicenseManager } from "ag-grid-enterprise/main";
 
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
LicenseManager.setLicenseKey("Softchoice_on_behalf_of_Bank_of_Montreal_LEAP_3Devs23_January_2019__MTU0ODIwMTYwMDAwMA==f3a98dae7e27918e6755fcb95baebea2");

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>

, document.getElementById('root'));

serviceWorker.unregister();
