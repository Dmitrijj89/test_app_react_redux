import React from 'react';
import './ListItems.scss';
import PropTypes from 'prop-types';
import { changeRole } from '../../selectors';
import { withRouter } from 'react-router-dom';



const ListItems =(props)=> {

     const { name, roles, phone } = props;
    return (
     
	        <tr className='listItem_table' onClick ={()=> props.history.push('/list/' + props.id )}>
			        <td>{name}</td>
              <td>{changeRole(roles)}</td>
              <td>{phone}</td>
          </tr>
      
    );
  
}
ListItems.propTypes = {
    name: PropTypes.string.isRequired,
    roles: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired
  }

export default withRouter( ListItems );