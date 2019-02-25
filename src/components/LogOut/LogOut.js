import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {logout} from '../../store/actions/auth';

class Logout extends Component {
	
   static propTypes = {

    logout: PropTypes.func
  }

  componentDidMount() {
    this.props.logout()
  }

  render() {
    return <Redirect to={'/'} />
  }
}


function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout)