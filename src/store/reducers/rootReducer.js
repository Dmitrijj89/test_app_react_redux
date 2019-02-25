import { combineReducers } from 'redux';
import mergerReducer from './merger';
import employeeDetailReducer from './employeeDetail';
import authReducer from './auth';

export default combineReducers ({
    merger: mergerReducer,
    employeeDetail: employeeDetailReducer,
    auth: authReducer
})