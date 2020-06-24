import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../actions/auth';
import { createMessage } from '../actions/messages';
import Alerts from '../layouts/Alerts';

class RegistrationPage extends Component {
  state = {  
    username: '',
    email: '',
    telephone: '',
    password1: '',
    password2: '',
  }

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    isRegistered: PropTypes.bool
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    const { username, email, telephone, password1, password2} = this.state;
    const validation = this.formValidation();

    if (validation.correct) {
      const newUser = { username, email, telephone, password1, password2 }
      this.props.register(newUser);
    } 
  }

  formValidation = () => {
    let username = false;
    let email = false;
    let telephone = false;
    let password1 = false;
    let password2 = false;
    let correct = false;

    if (this.state.username.length < 3 || this.state.username.length > 25) {
      this.props.createMessage({ usernameLengthError: 'Nazwa użytkownika musi zawierać od 3 do 25 znaków' })
    } else if (this.state.username.indexOf(' ') !== -1) {
      this.props.createMessage({ usernameSpaceError: 'Nazwa użytkownika nie może zawierać spacji' })
    } else {
      username = true;
    }

    if (!this.state.email.length) {
      this.props.createMessage({ emailLengthError: 'Email jest wymagany' })
    } else if (!this.state.email.match(/^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+/)) {
      this.props.createMessage({ emailFormatError: 'Nieprawidłowy format adresu email' })
    } else {
      email = true;
    }

    if (this.state.telephone.length === 0) {
      telephone = true;
    } else if (!this.state.telephone.match(/^\+\d{11}$/)) {
      this.props.createMessage({ telephoneFormatError: 'Nieprawidłowy format numeru telefonu' })
    } else {
      telephone = true;
    }

    if (this.state.password1.length < 8 || this.state.password1.length > 25 || this.state.password2.length < 8 || this.state.password2.length > 25) {
      this.props.createMessage({ passwordLengthError: 'Hasło musi zawierać od 8 do 25 znaków' })
    } else if (this.state.password1 !== this.state.password2) {
      this.props.createMessage({ passwordsNotMatch: 'Podane hasła nie są identyczne' })
    } else {
      password1 = true;
      password2 = true;
    }

    if (username && email && telephone && password1 && password2) {
      correct = true;
    }

    return ({
      username,
      email,
      telephone,
      password1,
      password2,
      correct
    })
  }

  render() { 
    if (this.props.isRegistered) {
      return <Redirect to='/login' />
    }

    return (  
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Rejestracja</h2>
          <form onSubmit={this.handleSubmit} noValidate>
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
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </div>
            <div className="form-group">
              <label>Numer telefonu (opcjonalnie)</label>
              <input
                type="text"
                className="form-control"
                name="telephone"
                onChange={this.handleChange}
                value={this.state.telephone}
              />
            </div>
            <div className="form-group">
              <label>Hasło</label>
              <input
                type="password"
                className="form-control"
                name="password1"
                onChange={this.handleChange}
                value={this.state.password1}
              />
            </div>
            <div className="form-group">
              <label>Powtórz hasło</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={this.handleChange}
                value={this.state.password2}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Potwierdź</button>
            </div>
            <p>
              Masz juz konto? <Link to="/login">Zaloguj się</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
 
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isRegistered: state.auth.isRegistered
})
 
export default connect(mapStateToProps, { register, createMessage })(RegistrationPage);