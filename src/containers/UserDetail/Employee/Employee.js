import React from 'react';
import PropTypes from 'prop-types';
import { changeRole } from '../../../selectors';

const Employee =(props)=> {
   
     const { name, roles, phone, birthday, isArchive } = props;
    return (
      <React.Fragment>
        <h3>Данные сотрудника</h3>
          <table>
            <tbody>
                <tr>
                  <td>Имя Фамиля:</td>
                  <td>{name}</td>
                </tr>
                <tr>
                  <td>Должность:</td>
                  <td>{changeRole(roles)}</td>
                </tr>
                <tr>
                  <td>Номер телефона:</td>
                  <td>{phone}</td>
                </tr>
                <tr>
                  <td>Дата рождения:</td>
                  <td>{birthday}</td>
                </tr>
                 <tr>
                  <td>В архиве:</td>
                  <td><input type='checkbox' defaultChecked={isArchive} /></td>
                </tr>
            </tbody>
          </table>
        </React.Fragment>
    );
  
}

Employee.propTypes = {
    name: PropTypes.string.isRequired,
    roles: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired
  }

export default Employee;