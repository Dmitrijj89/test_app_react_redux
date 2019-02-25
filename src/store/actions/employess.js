import axios from 'axios';
import { FETCH_EMPLOYEES_START,
         FETCH_EMPLOYEES_SUCCESS,
         FETCH_EMPLOYEES_ERROR,
         SEARCH_EMPLOYESS,
         FILTER_EMPLOYEES_ARCHIVE,
         FILTER_EMPLOYEES_ROLE,
         SORT_EMPLOYEES} from './actionTypes'

export function fetchEmployees() {
	return async (dispatch) => {
		dispatch(fetchEmployeesStart())
		try {
          const response = await axios.get('https://app-test-910e0.firebaseio.com/employees.json')
         // console.log('1', response.data)
          const employees = [];


          for ( let key in response.data) {
          //  console.log('123',key)
                    response.data[key].map((empl)=> {
                      // console.log('for', key)
                      return( employees.push({
                          id: key,
                          name: empl.name,
                          roles: empl.roles,
                          phone: empl.phone,
                          birthday: empl.birthday,
                          isArchive: empl.isArchive
                          
                    }));
                       
               })
            }
           dispatch(fetchEmployeesSuccess(employees))
        } catch (e) {
          dispatch(fetchEmployeesError(e))
        }
	}
}

export function fetchEmployeesStart() {
	return {
		type: FETCH_EMPLOYEES_START
	}
}

export function fetchEmployeesSuccess(employees) {
	return {
		type: FETCH_EMPLOYEES_SUCCESS,
		employees
	}
}

export function fetchEmployeesError(e) {
	return {
		type: FETCH_EMPLOYEES_ERROR,
		error: e
	}
}

export function searchEmployees(searchString) {
  return {
    type: SEARCH_EMPLOYESS,
    searchString
  };
}

export function filterEmployeesArchive(filterIsArch) {
  return {
    type: FILTER_EMPLOYEES_ARCHIVE,
    filterIsArch
  };
}

export function filterEmployeesRole(filterRole) {
  return {
    type: FILTER_EMPLOYEES_ROLE,
    filterRole
  };
}

export function sortEmployees(sort) {
  return {
    type: SORT_EMPLOYEES,
    sort
  };
}