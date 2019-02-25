import React from 'react';
import './TodoList.scss'
import ListItems from '../ListItems';
import PropTypes from 'prop-types';

const TodoList =({ empl })=> {
	const elements = empl.map((item)=> {
    
     const {...name} = item;

		return  <ListItems key={item.id} {...name} />
	})
	return (
         <table className='todoList_table'>
           <thead>
	           <tr className='todoList_table_tr'>
	              <th>Имя Фамилия</th>
	              <th>Должность</th>
	              <th>Номер телефона</th>
	           </tr>
	       </thead>
	       <tbody>
	             {elements}
	       </tbody>
	     </table>
		);
};

TodoList.propTypes = {

    empl: PropTypes.array.isRequired
  }

export default TodoList;
