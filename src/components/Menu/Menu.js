import React from 'react';
import './Menu.scss';
import PropTypes from 'prop-types';

const Menu =(props)=> {

	const clazz = [
        'menu',
        'fa'
	];

	if (props.isOpen) {
	    clazz.push('fa-times')
	    clazz.push('open')
    } else {
        clazz.push('fa-bars')
    }
	
	return(
          <i
           className={ clazz.join(' ') }
           onClick={props.onToggleMenu} 
           />
		);
};

Menu.propTypes = {

    isOpen: PropTypes.bool.isRequired,
    onToggleMenu: PropTypes.func
  }


export default Menu;