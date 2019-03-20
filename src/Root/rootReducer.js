import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import dataInputReducer from '../DataInput';

export const rootReducer = combineReducers({
    router: routerReducer,
    DataInput: dataInputReducer,
});
