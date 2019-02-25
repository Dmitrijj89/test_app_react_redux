import React, {Component} from 'react';
import {Route, Switch, NavLink, Redirect, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Auth from './Auth';
import Merger from './Merger';
import FormAddUser from './FormAddUser';
import UserDetail from './UserDetail';
import LogOut from '../components/LogOut';
import {connect} from 'react-redux';
import {autoLogin} from '../store/actions/auth'



class App extends Component {

  static propTypes = {

    autoLogin: PropTypes.func.isRequired,
    isAuthent: PropTypes.bool.isRequired
  }

componentDidMount() {
	this.props.autoLogin()
}

  render() {
     
     let routes = (
      <Switch>
        <Route path="/" exact component={Auth} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthent) {
      routes = (
       <Switch> 
        <Route path="/list/:id" component={UserDetail}/>
        <Route path="/list" exact component={Merger} />
        <Route path="/add" component={FormAddUser} />
        <Route path="/logout" component={LogOut} />
        <Redirect to={'/list'} />
      </Switch>
      )
    }

    let links = (
     <li>
      <NavLink to="/" exact ></NavLink>
    </li>
    )

    if (this.props.isAuthent) {
    	links = (
           <React.Fragment>
		      <li>
			      <NavLink to="/list" exact >Список сотрудников</NavLink>
			  </li>
			  <li>
			      <NavLink to="/add">Добавление сотрудника</NavLink>
			  </li>
			  <li>
			      <NavLink to="/logout">Выйти</NavLink>
			  </li>
		   </React.Fragment>
    	)
    } 

    return (
         <div>
	          <nav className="nav">
	              <ul>
	                {links}
	                
	              </ul>
	         </nav>

	          <hr/>

	          { routes }
         </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthent: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(App));