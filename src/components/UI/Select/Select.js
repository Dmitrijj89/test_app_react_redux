import React from 'react';
import './Select.scss';
import PropTypes from 'prop-types';

const Select = (props) => {
  const htmlFor = `${props.label}-${Math.random()}`
 
  return (
    <div className='Select'>
      <label htmlFor={htmlFor}>{props.label}</label>
      <select
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      >
        { props.options.map((option, index) => {
          return (
            <option
              value={option.value}
              key={option.value + index}
            >
              {option.text}
            </option>
          )
        }) }
      </select>
    </div>
  )
}

Select.propTypes = {

    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string
  }

export default Select;