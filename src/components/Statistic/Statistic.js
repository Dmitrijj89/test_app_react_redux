import React from 'react';
import './Statistic.scss';
import PropTypes from 'prop-types';

const Statistic =({empl})=> {

	const total = empl.length;
	const isArchive = empl.filter(empl => empl.isArchive).length;
	const notIsArchive = total - isArchive;
	
	return(
	   <table className='statistic'>
	       <tbody>
		      <tr>
			      <th>Всего сотрудников:</th>
				  <td>{total}</td>
			  </tr>
			  <tr>
			      <th>В архиве:</th>
				  <td>{isArchive}</td>
			  </tr>
			  <tr>
			      <th>Вне архива:</th>
				  <td>{notIsArchive}</td>
			  </tr>
		   </tbody>
	   </table>
	);
}

Statistic.propTypes = {

    empl: PropTypes.array.isRequired
  }

export default Statistic;