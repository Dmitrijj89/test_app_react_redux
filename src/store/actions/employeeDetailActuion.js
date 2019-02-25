import axios from 'axios';
import { FETCH_EMPLOYEE_START,
         FETCH_EMPLOYEE_SUCCESS,
         FETCH_EMPLOYEE_ERROR,
         FETCH_EMPLOYEE_DELETE_SUCCESS,
         CREATE_EMPLOYEE,
         RESET_CREATE_EMPLOYEE,
         RESET_EDIT_EMPLOYEE,
         EDIT_EMPLOYEE} from './actionTypes'

export function fetchEmployeeById(employeeId) {
	return async (dispatch)=> {

		dispatch( fetchEmployeeStart());

		 try {
		      const response = await axios.get(`https://app-test-910e0.firebaseio.com/employees/${employeeId}.json`)
		      const employee = response.data;
		      const idx = employeeId
		        

		     dispatch( fetchEmployeeSuccess(employee, idx))
		 }catch (e) {
		      dispatch( fetchEmployeeError(e))
		    }
	}
}

export function fetchEmployeeDelete(id) {
	return async (dispatch)=> {

		dispatch( fetchEmployeeStart())

		try{
	       await axios.post(`https://app-test-910e0.firebaseio.com/employees/${id}.json?x-http-method-override=DELETE`)

		       dispatch( fetchEmployeeDeleteSuccess())
	    } catch (e) {
	      dispatch( fetchEmployeeError(e))
	    }
	}
}

export function fetchEmployeeStart() {
	return {
		type: FETCH_EMPLOYEE_START
	}
}

export function fetchEmployeeSuccess(employee, idx) {
	return {
		type: FETCH_EMPLOYEE_SUCCESS,
		employee, idx
	}
}
export function fetchEmployeeDeleteSuccess() {
	return {
		type: FETCH_EMPLOYEE_DELETE_SUCCESS
	}
}

export function fetchEmployeeError(e) {
	return {
		type: FETCH_EMPLOYEE_ERROR,
		error: e
	}
}	

export function editEmployee(item) {
	return {
		type: EDIT_EMPLOYEE,
		item
	}
}	

export function resetEditEmployee() {
	return {
		type: RESET_EDIT_EMPLOYEE
	}
}

export function finishEditEmployee(id) {
	return async (dispatch, getState)=> {
//console.log('actionEdit', getState().employeeDetail.employee)
		await axios.post(`https://app-test-910e0.firebaseio.com/employees/${id}.json?x-http-method-override=PUT`, getState().employeeDetail.employee)
		dispatch(resetEditEmployee())
		
	}
}

export function resetCreateEmployee() {
	return {
		type: RESET_CREATE_EMPLOYEE
	}
}

export function createEmployee(item) {
	return {
		type: CREATE_EMPLOYEE,
		item
	}
}		

export function finishCreateEmployee() {
	return async (dispatch, getState)=> {
//console.log('action', getState().employeeDetail.employees)
		await axios.post('https://app-test-910e0.firebaseio.com/employees.json', getState().employeeDetail.employees)
		dispatch(resetCreateEmployee())
		
	}
}
