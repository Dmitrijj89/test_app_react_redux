import React, {Component} from 'react';
import { connect } from 'react-redux';
import './Auth.scss';
import PropTypes from 'prop-types';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import {createControl, validate, validateForm } from '../../formFramework/formFramework';
// import axios from 'axios';
import { auth } from '../../store/actions/auth'

function createFormControls() {
  return {
    email: createControl({
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email'
      }, {required: true, email: true }),
    password: createControl({
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль, минимум шесть символов'
    }, {required: true, minLength: 6})
   
  }
    
}

class Auth extends Component {

  static propTypes = {

    auth: PropTypes.func,
    createControl: PropTypes.func,
    validate: PropTypes.func,
    validateForm: PropTypes.func,
  }

  state = {
    formControls: createFormControls()
  }

  loginHandler = () => {
    this.props.auth(
         this.state.formControls.email.value,
         this.state.formControls.password.value,
         true
      )
  }

  registerHandler = () => {
    this.props.auth(
         this.state.formControls.email.value,
         this.state.formControls.password.value,
         false
      )
  }

  submitHandler = (e) => {
    e.preventDefault()
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
    });
  }


  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
          <Input
            key={controlName + index}
            type={control.type}
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(e) => this.changeHandler(e.target.value, controlName)}
            />
      )
    })
  }


  render() {
    return (
      <div className='auth'>
        <div>

          <form onSubmit={this.submitHandler} className='authForm'>

            { this.renderControls() }

            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Войти
            </Button>

            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
     auth: (email, password, isLogin)=> dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth);