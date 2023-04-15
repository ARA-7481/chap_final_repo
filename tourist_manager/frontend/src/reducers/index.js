import { combineReducers } from 'redux';
import vehicles from './vehicles';
import auth from './auth';
import statistics from './statistics';

export default combineReducers({
    statistics,
    vehicles,
    auth
});