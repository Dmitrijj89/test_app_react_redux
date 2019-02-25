import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EmplEditForm.scss';
import PropTypes from 'prop-types';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';
import Select from '../../../components/UI/Select';
import { validate, validateForm } from '../../../formFramework/formFramework.js';
import { editEmployee, finishEditEmployee } from '../../../store/actions/employeeDetailActuion';

function createFormControls(props) {
  return {
    name: {
        value: props.name,
        type: 'name',
        label: 'Введите имя фамилию',
        errorMessage: 'Поле не может быть пустым',
        valid: true,
        touched: true,
        validation: {
          required: true,
          minLength: 2
        },
      },
      phone: {
        value: props.phone,
        type: 'phone',
        mask: '+7 (999) 999-9999',
        label: 'Введите номер телефона',
        errorMessage: 'Поле не может быть пустым, соблюдайте валидацию',
        valid: true,
        touched: true,
        validation: {
          required: true,
          phone: true
        },
      },
    birthday: {
        value: props.birthday,
        type: 'birthday',
        mask: '99.99.9999',
        label: 'Введите день рождения (формат ДД.ММ.ГГГГ)',
        errorMessage: 'Поле не может быть пустым, соблюдайте валидацию',
        valid: true,
        touched: true,
        validation: {
          required: true,
          birthday: true
        },
      }
  }
    
}


class EmplEditForm extends Component {

  static propTypes = {

    validate: PropTypes.func,
    validateForm: PropTypes.func,
    editEmployee: PropTypes.func,
    finishEditEmployee: PropTypes.func,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    employee: PropTypes.array.isRequired,
    birthday: PropTypes.string.isRequired
  }

	 state = {
  	 	isFormValid: false,
  	 	isArchive: false,
  	 	roles: 'driver',
	    formControls: createFormControls(this.props)
      };


      submitHandler =(e)=> {
          e.preventDefault();

          const {name, phone, birthday} = this.state.formControls;
          const {roles, isArchive} = this.state;

          const employeeItem = {
          	  id: this.props.employee.length + 1,
    		      name: name.value,
    		      roles: roles,
    		      phone: phone.value,
    		      birthday: birthday.value,
    		      isArchive: isArchive
		    };

        this.props.editEmployee(employeeItem);
         
                  this.setState({
                    isFormValid: false,
                    isArchive: false,
                    roles: 'driver',
                    formControls: createFormControls(this.props),
                  });
             this.props.finishEditEmployee(this.props.idx);
                
       alert('Изменения сохранены!!!')
     this.props.goToListEdit();
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
  //  console.log('321', this.props.roles)
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
	              defaultValue={this.props.employee.roles}
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
      roles: e.target.value,
      isFormValid: true
    })
  }

   onCheckboxChange =(e)=> {
    this.setState({
      isArchive: e.target.value,
      isFormValid: true
    })
  };

  render() {

    return (
     
        <React.Fragment>
          <h3>Форма редактирования</h3>

          <form onSubmit={this.submitHandler }>

            { this.renderControls() }

          <div className='checkbox'>

            Добавить в архив

	            <input 
	              type='checkbox'
	              onChange={this.onCheckboxChange} 
	              defaultChecked={this.props.isArchive} 
	              />
          </div>

          <Button
	          type='submit'
	          disabled={!this.state.isFormValid}
	        >
	          Сохранить изменения
	        </Button>

           
          </form>
       
      </React.Fragment>
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
    editEmployee: (item)=> dispatch(editEmployee(item)),
    finishEditEmployee: (id)=> dispatch(finishEditEmployee(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmplEditForm);