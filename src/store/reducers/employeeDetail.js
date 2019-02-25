import { FETCH_EMPLOYEE_START,
         FETCH_EMPLOYEE_SUCCESS,
         FETCH_EMPLOYEE_ERROR,
         FETCH_EMPLOYEE_DELETE_SUCCESS,
         CREATE_EMPLOYEE,
         EDIT_EMPLOYEE,
         RESET_EDIT_EMPLOYEE,
         RESET_CREATE_EMPLOYEE } from '../actions/actionTypes';

export const initialState = {

   loading: false,
   employee: [],
   employees: [],
   employeeEdit: [],
   idx: [],
   error: null
 
}

export default function employeeDetailReducer( state = initialState, action) {

	switch (action.type) {
		case FETCH_EMPLOYEE_START:
		   return {
		   	 ...state, loading: true
		   }
		case FETCH_EMPLOYEE_SUCCESS:
		   return {
		   	 ...state, loading: false, employee: action.employee, idx: action.idx
		   }
		case FETCH_EMPLOYEE_ERROR:
		   return {
		   	 ...state, loading: false, error: action.error
		   }
		case FETCH_EMPLOYEE_DELETE_SUCCESS:
		   return {
		   	 ...state, loading: true
		   }
		case CREATE_EMPLOYEE:
		   return {
		   	 ...state, 
		   	 employees: [...state.employees, action.item]
		   }
		case EDIT_EMPLOYEE:
		   return {
		   	 ...state, 
		   	 employee: [...state.employeeEdit, action.item]
		   }
		case RESET_CREATE_EMPLOYEE:
		   return {
		   	 ...state, employees: []
		   }
		case RESET_EDIT_EMPLOYEE:
		   return {
		   	 ...state, employeeEdit: []
		   }
		default:
		   return state
	}
}
