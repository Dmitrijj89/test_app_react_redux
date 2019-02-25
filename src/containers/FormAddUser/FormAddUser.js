import React, { Component } from 'react';
import { connect } from 'react-redux';
import './FormAddUser.scss';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import PropTypes from 'prop-types';
import { createControl, validate, validateForm } from '../../formFramework/formFramework.js';
// import axios from 'axios';
import { createEmployee, finishCreateEmployee } from '../../store/actions/employeeDetailActuion';


function createFormControls() {
  return {
    name: createControl({
      value: '',
      type: 'name',
      label: 'Введите Имя Фамилию',
      errorMessage: 'Поле не может быть пустым'
    }, {required: true, minLength: 2}),
    phone: createControl({
      value: '',
      type: 'phone',
      mask: '+7 (999) 999-9999',
      label: 'Введите номер телефона (формат +7  (XXX)  XXX-XXXX)',
      errorMessage: 'Поле не может быть пустым, соблюдайте валидацию'
    }, {required: true, phone: true}),
    birthday: createControl({
      value: '',
      mask: '99.99.9999',
      type: 'birthday',
      label: 'Введите день рождения (формат ДД.ММ.ГГГГ)',
      errorMessage: 'Поле не может быть пустым, соблюдайте валидацию'
    }, {required: true, birthday: true}),
   
  }
    
}

class FormAddUser extends Component {

  static propTypes = {

    finishCreateEmployee: PropTypes.func,
    createEmployee: PropTypes.func,
    createControl: PropTypes.func,
    validate: PropTypes.func,
    validateForm: PropTypes.func,
    employee: PropTypes.array
  }

	 state = {
	 
	 	isFormValid: false,
	 	isArchive: false,
	 	roles: 'driver',
	    formControls: createFormControls()
      };

      onCheckboxChange =(e)=> {
    		this.setState({
    			isArchive: e.target.value
    		})
	};

      submitHandler = (e) => {
          e.preventDefault();

          const {name, phone, birthday} = this.state.formControls;
          const {roles, isArchive} = this.state;

          const employeesItem = {
            id: this.props.employee.length + 1,
  		      name: name.value,
  		      roles: roles,
  		      phone: phone.value,
  		      birthday: birthday.value,
  		      isArchive: isArchive
		    };

		  this.props.createEmployee(employeesItem);

		   this.setState({
		      isFormValid: false,
	 	      isArchive: false,
	 	      roles: 'driver',
		      formControls: createFormControls()
		    });
       this.props.finishCreateEmployee()
   }
	

	

 changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
      	<React.Fragment key={controlName + index}>
	        <Input
	            label={control.label}
              type={control.type}
              mask={control.mask}
              value={control.value}
              valid={control.valid}
              shouldValidate={!!control.validation}
              touched={control.touched}
              errorMessage={control.errorMessage}
              onChange={(e) => this.changeHandler(e.target.value, controlName)}
              />
	        { 
	        	index === 0 
	        	 ? 
	        	 <Select
	              label="Выберите должность"
	              value={this.state.roles}
	              onChange={this.selectChangeHandler}
				      options={[
				        {text: 'Водитель', value: 'driver'},
				        {text: 'Официант', value: 'waiter'},
				        {text: 'Повар', value: 'cook'},
				      ]}
	              />
	        	 :
	        	 null
	        }
	    </React.Fragment>
      )
    })
  }

  selectChangeHandler =(e) => {
    this.setState({
      roles: e.target.value
    })
  }

  render() {

    return (
      <div className='formAdd'>
        <div className='formAddForm'>
          <h1>Добавление сотрудника</h1>

          <form onSubmit={this.submitHandler } >

            { this.renderControls() }

          <div className='checkbox' >

            Добавить в архив

	            <input 
	              type='checkbox'
	              onChange={this.onCheckboxChange} 
	              checked={this.state.isArchive} 
	              />
          </div>

          <Button
	          type='submit'
	          disabled={!this.state.isFormValid}
	        >
	          Добавить сотрудника
	      </Button>

           
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
          
   return {
      
       employee: state.employeeDetail.employee
   }
}

function mapDispatchToProps(dispatch) {
  return {
    createEmployee: (item)=> dispatch(createEmployee(item)),
    finishCreateEmployee: (id)=> dispatch(finishCreateEmployee(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormAddUser);
