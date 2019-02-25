import React from 'react';
import './Input.scss';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';


function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

const Input = (props) => {
  const inputType = props.type || 'text'
  const inputMask = props.mask || null
  const clazz = ['input']
  const htmlFor = `${inputType}-${Math.random()}`

  if (isInvalid(props)) {
    clazz.push('invalid')
  }

  return (
    <div className={clazz.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
     
      <InputMask
        type={inputType}
        mask={inputMask}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />

      {
        isInvalid(props)
          ? <span>{props.errorMessage || 'Введите верное значение'}</span>
          : null
      }
    </div>
  )
}

Input.propTypes = {

    onChange: PropTypes.func,
    type: PropTypes.string
  }

export default Input;