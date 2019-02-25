import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

const Button = (props) => {

  const clazz = [
    'button',
    [props.type]
  ]

  return (
    <button
      onClick={props.onClick}
      className={clazz.join(' ')}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

Button.propTypes = {

    onClick: PropTypes.func,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.string
  }

export default Button;