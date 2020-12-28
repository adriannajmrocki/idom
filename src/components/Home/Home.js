import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18n from '../../i18n/i18n';
import { useTranslation } from 'react-i18next';

import { login, register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';
import Alerts from '../Alerts/Alerts';

import idom1 from './img/idom1.svg';
import idom2 from './img/idom2.svg';

import './style.css';

class Home extends Component {
  // const { t } = useTranslation();

  state = {
    signUpMode: false,
    username: '',
    signInPassword: '',
    email: '',
    telephone: '',
    password1: '',
    password2: '',
    language: '',
    isSelected: false
  }

  handleTextChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSelect = e => {
    this.setState({ 
      [e.target.name]: e.target.value,
      isSelected: true
    })
    console.log(this.state.language)
  }

  handleSignInSubmit = e => {
    e.preventDefault();

    this.props.login(this.state.username, this.state.signInPassword);
  }

  formValidation = () => {
    let username = false;
    let email = false;
    let telephone = false;
    let password1 = false;
    let password2 = false;
    let language = false
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

    if (!this.state.language) {
      this.props.createMessage({ languageError: 'Wybierz język powiadomień' })
    } else {
      language = true;
    }

    if (username && email && telephone && password1 && password2 && language) {
      correct = true;
    }

    return ({
      username,
      email,
      telephone,
      password1,
      password2,
      language,
      correct
    })
  }

  handleSignUpSubmit = e => {
    e.preventDefault();

    const { username, email, telephone, password1, password2, language} = this.state;
    const validation = this.formValidation();

    if (validation.correct) {
      const newUser = { username, email, telephone, password1, password2, language }
      this.props.register(newUser);
      this.setState({
        username: '',
        email: '',
        telephone: '',
        password1: '',
        password2: '',
        language: '',
        isSelected: false
      })
    } 
  }

  render() {

    if (this.props.isAuthenticated) {
      return <Redirect to='/board' />
    }

    const { signUpMode, username, signInPassword, email, telephone, language, password1, password2, isSelected } = this.state;

    return (  
      <div className={`home-container ${signUpMode ? 'sign-up-mode' : ''}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form className="home-form sign-in-form" onSubmit={this.handleSignInSubmit}>
              <div className="avatar">
                <i className="fas fa-user fa-4x"></i>
              </div>
              <h2 className="home-title">Logowanie</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="username"
                  onChange={this.handleTextChange}
                  value={username}
                  placeholder="Nazwa użytkownika" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password" 
                  name="signInPassword"
                  onChange={this.handleTextChange}
                  value={signInPassword}
                  placeholder="Hasło" />
              </div>
              <input type="submit" value="Zaloguj się" className="button solid" />
  
              <div className="pwd-reset-section">
                <p className="pwd-reset"><Link to="/resetpwd">Nie pamiętasz hasła?</Link></p>
              </div>
            </form>
  
            <form className="home-form sign-up-form" onSubmit={this.handleSignUpSubmit}>
              <h2 className="home-title">Rejestracja</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input 
                  type="text" 
                  name="username"
                  onChange={this.handleTextChange}
                  value={username}
                  placeholder="Nazwa użytkownika" />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input 
                  type="text" 
                  name="email"
                  onChange={this.handleTextChange}
                  value={email}
                  placeholder="Email" />
              </div>
              <div className="input-field">
                <i className="fas fa-phone-alt"></i>
                <input 
                type="text" 
                name="telephone"
                onChange={this.handleTextChange}
                value={telephone}
                placeholder="Numer telefonu (z kierunkowym)" />
              </div>
              <div className="input-field">
                <i className="fas fa-globe-americas"></i>
                <select name="language" className={`${isSelected ? 'selected' : ''}`} onChange={this.handleSelect} value={language}>
                  <option value="" defaultValue disabled>Język powiadomień</option>
                  <option value="pl">Polski</option>
                  <option value="eng">Angielski</option>
                </select>
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input 
                  type="password" 
                  name="password1"
                  onChange={this.handleTextChange}
                  value={password1}
                  placeholder="Hasło" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input 
                  type="password" 
                  name="password2"
                  onChange={this.handleTextChange}
                  value={password2}
                  placeholder="Powtórz hasło" />
              </div>
              <input type="submit" value="Zarejestruj się" className="button solid" />
            </form>
          </div>
        </div>
  
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3 className="panel-head">Nie masz jeszcze konta?</h3>
              <p>Dzięki aplikacji IDOM możesz kontrolować swój inteligentny dom nie ruszając się zmiejsca. <br /> Dołącz do nas i zobacz jakie to proste!</p>
              <button className="button transparent"id="sign-up-btn" onClick={() => this.setState({ signUpMode: true })}>Dołącz do IDOM</button>
              <img src={idom2} className="image" alt=""/>
            </div>
          </div>
  
          <div className="panel right-panel">
            <div className="content">
              <h3 className="panel-head">Korzystasz z IDOM?</h3>
              <p>Świetnie! Zaloguj się, aby w pełni korzystać z udogodnień inteligentnego domu.</p>
              <button className="button transparent" id="sign-in-btn" onClick={() => this.setState({ signUpMode: false })}>Zaloguj się</button>
              <img src={idom1} className="image" alt=""/>
            </div>
          </div>
        </div>
      </div>
    );

  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
 
export default connect(mapStateToProps, { login, register, createMessage })(Home);