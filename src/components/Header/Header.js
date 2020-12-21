import React, { Component, Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../actions/auth';

import './style.css';

class Header extends Component {

  state = {
    isMenuVisible: false
  }

  render() {

    const { isAuthenticated } = this.props.auth;
    const { isMenuVisible } = this.state;

    const authLinks = (
      <Fragment>
        <label htmlFor="check" className="checkbtn"><i className="fas fa-bars" onClick={() => this.setState({ isMenuVisible: !isMenuVisible })}></i></label>
        <label className="brand-name"><Link to="board">IDOM</Link></label>
        <ul className={`${isMenuVisible ? 'show-menu' : ''}`}>
          <li><NavLink to="/dashboard" onClick={() => this.setState({ isMenuVisible: !isMenuVisible })}>Czujniki</NavLink></li>
          <li><NavLink to="/controllers" onClick={() => this.setState({ isMenuVisible: !isMenuVisible })}>Sterowniki</NavLink></li>
          <li><NavLink to="/actions" onClick={() => this.setState({ isMenuVisible: !isMenuVisible })}>Akcje</NavLink></li>
          <li><NavLink to="/cameras" onClick={() => this.setState({ isMenuVisible: !isMenuVisible })}>Kamery</NavLink></li>
          <li><NavLink to="/admin" onClick={() => this.setState({ isMenuVisible: !isMenuVisible })}>Konto</NavLink></li>
          <button onClick={this.props.logout}>Wyloguj</button>
        </ul>
      </Fragment>  
    );

    return (
      <nav className={`${isAuthenticated ? 'visible' : 'invisible'}`}>
        { isAuthenticated ? authLinks : false }
      </nav>
    )
  }
}
 
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Header);