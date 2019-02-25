import React, { Component } from 'react';
import './Merger.scss';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Statistic from '../../components/Statistic';
import SearchUser from '../../components/SearchUser';
import TodoList from '../../components/TodoList';

import Layout from '../../selectors/Layout';
import Loader from '../../components/UI/Loader';
import { connect } from 'react-redux';
import { fetchEmployees } from '../../store/actions/employess';
import { searchEmployeesSelec,
         filterEmployeesArchiveSelec,
         filterEmployeesRoleSelec,
         sortEmployeesSelector } from '../../selectors';



class Merger extends Component {
    
     static propTypes = {

        fetchEmployees: PropTypes.func.isRequired,
        searchEmployeesSelec: PropTypes.func,
        filterEmployeesArchiveSelec: PropTypes.func,
        filterEmployeesRoleSelec: PropTypes.func,
        sortEmployeesSelector: PropTypes.func,
        employees: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
        searchString: PropTypes.string,
        filterIsArch: PropTypes.string,
        filterRole: PropTypes.string,
        sort: PropTypes.string
      }

     componentDidMount() {
      this.props.fetchEmployees()
        
      }


	render() {

        
         const { employees} = this.props;

		return (
        <div className='merger'>
            <Layout>
                 <div className='merger_table'>
    		        <Header />
                   
    		        <Statistic empl={employees} />      
                  
                    <SearchUser />

                    {
                        this.props.loading 
                         ? 
                        <Loader />
                        :
                        <TodoList empl={employees} />
                    }
                </div>
            </Layout>
        </div>
		);
	 }
    
}

function mapStateToProps(state) {

  const { employees,
          loading,
          searchString,
          filterIsArch,
          filterRole,
          sort } = state.merger;

   return {
    employees: sortEmployeesSelector( 
               filterEmployeesRoleSelec( 
               filterEmployeesArchiveSelec( 
               searchEmployeesSelec( employees, searchString),
                                                filterIsArch),
                                                filterRole),
                                                sort),
    loading,
    searchString,
    filterIsArch,
    filterRole
   }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEmployees: ()=> dispatch(fetchEmployees())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Merger)