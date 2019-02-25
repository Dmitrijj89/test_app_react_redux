import React, { Component } from 'react';
import './style.scss';
import Select from '../UI/Select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterEmployeesArchive, filterEmployeesRole } from '../../store/actions/employess'


class UserFilter extends Component {

static propTypes = {

    filterEmployeesRole: PropTypes.func,
    filterEmployeesArchive: PropTypes.func,
    filterIsArch: PropTypes.string
  }
              state = {
                    value: 'all'
                };  

  buttons = [
    { name: 'all', label: 'Все сотрудники'},
    { name: 'isArchive', label: 'В архиве'},
    { name: 'notIsArchive', label: 'Вне архива'}
  ];

  filterChange = (e) => {  
     this.onSubmit(e);
        this.setState({value: e.target.value});  
    } 

  onSubmit =(e)=> {
    e.preventDefault();
    const filterRole = e.target.value;
    this.props.filterEmployeesRole(filterRole);
    
  }
	
  render() {

    const { filterIsArch, filterEmployeesArchive } = this.props;
  	
    const buttons = this.buttons.map(({name, label})=>{

      const isActive = filterIsArch === name;
      const clazz = isActive ? 'btn-active_filter' : 'btn_filter';
      return(
          <button
           className={`${clazz}`}
           key={name}
           onClick={()=> filterEmployeesArchive(name)}>{label}</button>
        );
    })

    return (
       <div>
         <form onSubmit={this.onSubmit}> 
          <Select
                label="Фильтрация по должности"
                value={this.state.value}
                onChange={this.filterChange}
              options={[
                {text: 'Все сотрудники', value: 'all'},
                {text: 'Водитель', value: 'driver'},
                {text: 'Официант', value: 'waiter'},
                {text: 'Повар', value: 'cook'},
              ]}
                /> 
        </form> 
        <div>
           <h4>Фильтрация по архиву</h4>
           {buttons}
        </div>   
      </div>
      );
  }
}
function mapStateToProps(state) {

  const { filterIsArch } = state.merger;
          
   return {
     filterIsArch
   }
}

function mapDispatchToProps(dispatch) {
  return {
    filterEmployeesArchive: (filterIsArch)=> dispatch(filterEmployeesArchive(filterIsArch)),
    filterEmployeesRole: (filterRole)=> dispatch(filterEmployeesRole(filterRole))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFilter)
