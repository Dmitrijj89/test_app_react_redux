import React, {Component} from 'react';
import Backdrop from '../Backdrop'
import './MenuBar.scss';
import PropTypes from 'prop-types';
import UserFilter from '../../UserFilter';
import UserSort from '../../UserSort';


class MenuBar extends Component {

   static propTypes = {

    onClose: PropTypes.func,
    isOpen: PropTypes.bool
  }

  onCloseMenu =()=> {
    this.props.onClose();
  }

  render() {
    const clazz = ['menuBar']

    if (!this.props.isOpen) {
      clazz.push('close')
    }

    return (
    	<React.Fragment>
           <div onClick={this.onCloseMenu} className={clazz.join(' ')}>
	           <UserFilter />
             <UserSort />
           </div>
           {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
    	</React.Fragment>
    );
  }
}

export default MenuBar;