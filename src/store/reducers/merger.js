import { FETCH_EMPLOYEES_START,
         FETCH_EMPLOYEES_SUCCESS,
         FETCH_EMPLOYEES_ERROR,
         SEARCH_EMPLOYESS,
         FILTER_EMPLOYEES_ARCHIVE,
         FILTER_EMPLOYEES_ROLE,
         SORT_EMPLOYEES } from '../actions/actionTypes';

export const initialState = {
    employees: [],
    loading: false,
    searchString: '',
    filterIsArch: 'all',
    filterRole: 'all',
    sort: 'all',
    error: null
}

export default function mergerReducer( state = initialState, action) {

	switch (action.type) {
		case FETCH_EMPLOYEES_START:
		   return {
		   	 ...state, loading: true
		   }
		case FETCH_EMPLOYEES_SUCCESS:
		   return {
		   	 ...state, loading: false, employees: action.employees
		   }
		case FETCH_EMPLOYEES_ERROR:
		   return {
		   	 ...state, loading: false, error: action.error
		   }

		case SEARCH_EMPLOYESS:		 
		      return {
		        ...state,
		        searchString: action.searchString
		      };
		case FILTER_EMPLOYEES_ARCHIVE:
		   return {
		   	...state, filterIsArch: action.filterIsArch
		   }
		case FILTER_EMPLOYEES_ROLE:
		   return {
		   	...state, filterRole: action.filterRole
		   }
		case SORT_EMPLOYEES:
		   return {
		   	...state, sort: action.sort
		   }
		default:
		   return state
	}
}
