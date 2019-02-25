import React, { Component } from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sortEmployees } from '../../store/actions/employess'

class UserSort extends Component {

static propTypes = {

    sort: PropTypes.string,
    sortEmployees: PropTypes.func,
  }

  buttons = [
    { name: 'all', label: 'Сброс'},
    { name: 'abc', label: 'Сортировка А-В'},
    { name: 'cba', label: 'Сортировка В-А'},
    { name: '123', label: 'Сортировка 1-2'},
    { name: '321', label: 'Сортировка 2-1'}
  ];
	render() {

		const { sort, sortEmployees } = this.props;

		const buttons = this.buttons.map(({name, label})=>{
  
        const isActive = sort === name;
        const clazz = isActive ? 'btn-active_sort' : 'btn_sort';
      return(
          <button
           className={`${clazz}`}
           key={name}
           onClick={()=> sortEmployees(name)}>{label}</button>
        );
    })

         return (
            <div>
      			   <h4>Сортировка сотрудников</h4>
      			   <div>
      	                {buttons}
      				</div>
				
            </div>
        );
	}
  
}

function mapStateToProps(state) {

  const { sort } = state.merger;
          
   return {
     sort
   }
}

function mapDispatchToProps(dispatch) {
  return {
    sortEmployees: (sort)=> dispatch(sortEmployees(sort))
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSort)
