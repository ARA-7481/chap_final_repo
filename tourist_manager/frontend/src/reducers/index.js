import { combineReducers } from 'redux';
import vehicles from './vehicles';
import auth from './auth';

export default combineReducers({
    vehicles,
    auth
});