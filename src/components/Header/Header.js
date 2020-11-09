import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';


export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    // If user is authenticated returns authLinks, else returns guestLinks
    const authLinks = (
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <span className="navbar-text mr-3">
          <strong>
            { user ? `Welcome ${user.username}` : ''}
          </strong>
        </span>
        <li className="nav-item">
          <Link to='/dashboard' className="nav-link">Czujniki</Link>
        </li>
        <li className="nav-item">
          <Link to='/cameras' className="nav-link">Kamery</Link>
        </li>
        <li className="nav-item">
          <Link to='/admin' className="nav-link">Użytkownicy</Link>
        </li>
        <li className="nav-item">
          <button onClick={this.props.logout} className="btn btn-outline-primary btn-sm">Wyloguj</button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to='/register' className="nav-link">Rejestracja</Link>
        </li>
        <li className="nav-item">
          <Link to='/login' className="nav-link">Logowanie</Link>
        </li>
      </ul>
    )

    return (
      // Render navbar
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <h1 className="navbar-brand">IDOM</h1>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            { isAuthenticated ? authLinks : guestLinks }
          </div>
        </div>
      </nav>
    )
  }
}
 
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Header);