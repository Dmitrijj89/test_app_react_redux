import React from 'react';
import './Backdrop.scss';
import PropTypes from 'prop-types';

const Backdrop =(props)=> <div className='backdrop' onClick={props.onClick} />

Backdrop.propTypes = {

    onClick: PropTypes.func
  }
  
export default Backdrop;