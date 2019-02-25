import React from 'react';
import { connect } from 'react-redux';
import './UserDetail.scss';
import PropTypes from 'prop-types';
import Loader from '../../components/UI/Loader';
import Button from '../../components/UI/Button';
import Employee from './Employee';
import EmplEditForm from './EmplEditForm';
import { fetchEmployeeById, fetchEmployeeDelete } from '../../store/actions/employeeDetailActuion'


class UserDetail extends React.Component {

  static propTypes = {

    fetchEmployeeById: PropTypes.func.isRequired,
    fetchEmployeeDelete: PropTypes.func.isRequired,
    employee: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  }

    state = {
      editing: false
    }

    componentDidMount() {
      this.props.fetchEmployeeById(this.props.match.params.id)
  }
   handlerDeleteEmpl =()=> {
   	
   	    const conf = window.confirm('Вы уверены? Данные будут удалены безвозвратно!')
        if(conf) {
          this.props.fetchEmployeeDelete(this.props.match.params.id);
          this.goToListUser();
    		} else {
          return null;
    		}
   }
 
   goToListEdit =()=> {
   	this.setState ({
   		editing:false
   	})
   }
   handlerEdit =()=> {
    this.setState({
      editing: true
    })
   } 

    goToListUser =()=> {
      this.props.history.push('/list')
    }

   userSingleRender =()=> {
   	if (this.props.employee !== 0){
  
   const idx = this.props.idx;

     return this.props.employee.map((user )=> {
     
  		const {...name } = user;
  		return (this.state.editing ?
  			<EmplEditForm key={idx}
                      {...name}
                      idx={idx}
                      goToListEdit={this.goToListEdit}/>
  			:
  			<React.Fragment key={idx}>
	  			 
			     <Employee {...name}/>
			     <div> 
			       <Button type='success' onClick={this.handlerEdit}>Редактировать</Button>
           
	           <Button type='error' onClick={this.handlerDeleteEmpl}>Удалить</Button>
           </div>
        </React.Fragment>
  		  	);
  	    })
   	 }
   	
   }

  render() {

    return (
      <div className='userDetail'>
        <div className='userDetail_employee'>
        {   this.props.employee.length !== 0 
	    	?  
	    	this.userSingleRender()
	    	: 
	    	<Loader />
	        
        }
          
        <Button type='open' onClick={this.goToListUser}>
           Вернуться к списку
        </Button>
          
        </div>
      </div>
    )

  }
}

function mapStateToProps(state) {
          
   return {
      loading: state.employeeDetail.loading,
      employee: state.employeeDetail.employee,
      idx: state.employeeDetail.idx
   }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEmployeeById: (id)=> dispatch(fetchEmployeeById(id)),
    fetchEmployeeDelete: (id)=> dispatch(fetchEmployeeDelete(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)