import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../UI/Input';
import PropTypes from 'prop-types';
import { searchEmployees } from '../../store/actions/employess';


class SearchUser extends Component {

  static propTypes = {

    searchEmployees: PropTypes.func
  }
        
        state = {
        	searchString: ''
        };

        searchChange =(e)=> {
        	const searchString = e.target.value;
        	this.props.searchEmployees( searchString );
            this.setState ({ searchString });
        };

	render() {
		return(
              <Input type='text' 
                     label='Поиск сотрудников' 
                     value={this.state.searchString} 
                     onChange={this.searchChange} />
			);
	}
	
}


function mapDispatchToProps(dispatch) {
  return {
    searchEmployees: (searchString)=> dispatch(searchEmployees(searchString))
  }
}

export default connect(null, mapDispatchToProps)(SearchUser)
