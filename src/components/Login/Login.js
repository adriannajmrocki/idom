import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { createMessage } from '../../actions/messages';
import Alerts from '../Alerts/Alerts';

class LoginPage extends Component {
  state = {  
    username: '',
    password: '',
  }

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  render() { 
    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />
    }

    return (  
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Logowanie</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Login</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.handleChange}
                value={this.state.username}
              />
            </div>
            <div className="form-group">
              <label>Hasło</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Potwierdź</button>
            </div>
            <p>
              Nie masz jeszcze konta? <Link to="/register">Zarejestruj się</Link>
            </p>
            <p>
              Zapomniałeś hasła? <Link to='/resetpwd'>Zresetuj</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
 
export default connect(mapStateToProps, { login })(LoginPage);