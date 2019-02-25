import React, {Component} from 'react';
import Menu from '../../components/Menu';
import MenuBar from '../../components/Menu/MenuBar';
import './Layout.scss';

class Layout extends Component {

	state = {
		menu: false
	}

	onToggleMenu =()=> {
		this.setState({
			menu: !this.state.menu
		});
	}

    menuClose =()=> {
    	this.setState({
    		menu: false
    	});
    }

  render() {
    return (
      <div>
         
        <MenuBar
          isOpen={this.state.menu}
          onClose={this.menuClose}
        />
        <Menu 
         onToggleMenu={this.onToggleMenu}
         isOpen={this.state.menu}
        />
        <main>
          { this.props.children }
        </main>
      </div>
    )
  }
}

export default Layout