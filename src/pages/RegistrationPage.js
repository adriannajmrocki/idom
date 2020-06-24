// import React, { Component } from 'react';
// import '../styles/RegistrationPage.css';

// class RegistrationPage extends Component {
//   state = {  
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     repeatPassword: "",
//     message: "",

//     errors: {
//       username: false,
//       email: false,
//       phone: false,
//       password: false,
//       repeatPassword: false,
//     }
//   }

//   messages = {
//     usernameError: "* Wymagane od 2 do 30 znaków. Nie może zawierać spacji",
//     emailError: "* Wymagany znak @",
//     phoneError: "* Wymagane dokładnie 9 cyfr",
//     passwordError: "* Wymagane od 8 do 20 znaków",
//     repeatPasswordError: "* Podane hasła nie są takie same",
//   }

//   handleChange = e => {
//     const name = e.target.name;
//     const value = e.target.value;

//     this.setState({
//       [name]: value,
//     })
//   }

//   handleSubmit = e => {
//     e.preventDefault();
//     const validation = this.formValidation();

//     if (validation.correct) {
//       this.setState({
//         username: "",
//         email: "",
//         phone: "",
//         password: "",
//         repeatPassword: "",

//         errors: {
//           username: false,
//           email: false,
//           phone: false,
//           password: false,
//           repeatPassword: false,
//         }
//       })
//     } else {
//       this.setState({
//         errors: {
//           username: !validation.username,
//           email: !validation.email,
//           phone: !validation.phone,
//           password: !validation.password,
//           repeatPassword: !validation.repeatPassword,
//         }
//       })
//     }
//   }

//   formValidation = () => {
//     let username = false;
//     let email = false;
//     let phone = false;
//     let password = false;
//     let repeatPassword = false;
//     let correct = false;

//     if (this.state.username.length >= 2 && this.state.username.indexOf(" ") === -1) {
//       username = true;
//     }

//     if (this.state.email.indexOf("@") !== -1 && this.state.email.length > 0) {
//       email = true;
//     }

//     if (this.state.phone.length === 9 || this.state.phone.length === 0) {
//       phone = true;
//     }

//     if (this.state.password.length >= 8 && this.state.password.length <= 30) {
//       password = true;
//     }

//     if (this.state.repeatPassword === this.state.password) {
//       repeatPassword = true;
//     }

//     if (username && email && phone && password && repeatPassword) {
//       correct = true;
//     }

//     return ({
//       username,
//       email,
//       phone,
//       password,
//       repeatPassword,
//       correct,
//     })
//   }

//   render() { 
//     const { username, email, phone, password, repeatPassword } = this.state;

//     return (  
//       <div id="container-registration">
//         <div id="content-registration">
//           <h1>REJESTRACJA</h1>
//           <div className="bottom-line"></div>
//           <form action="" onSubmit={this.handleSubmit} noValidate>
//             <div className="form-group">
//               <label htmlFor="username">Nazwa użytkownika</label>
//               <input type="text" name="username" id="username" value={username} onChange={this.handleChange} required/>
//               {this.state.errors.username && <p className="error-message">{this.messages.usernameError}</p>}
//             </div>

//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input type="email" name="email" id="email" value={email} onChange={this.handleChange} required/>
//               {this.state.errors.email && <p className="error-message">{this.messages.emailError}</p>}
//             </div>

//             <div className="form-group">
//               <label htmlFor="phone">Numer telefonu (opcjonalnie)</label>
//               <input type="tel" name="phone" id="phone" value={phone} onChange={this.handleChange}/>
//               {this.state.errors.phone && <p className="error-message">{this.messages.phoneError}</p>}
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">Hasło</label>
//               <input type="password" name="password" id="password" value={password} onChange={this.handleChange} required/>
//               {this.state.errors.password && <p className="error-message">{this.messages.passwordError}</p>}
//             </div>

//             <div className="form-group">
//               <label htmlFor="repeat-password">Powtórz hasło</label>
//               <input type="password" name="repeatPassword" id="repeat-password" value={repeatPassword} onChange={this.handleChange} required/>
//               {this.state.errors.repeatPassword && <p className="error-message">{this.messages.repeatPasswordError}</p>}
//             </div>

//             <button>Zarejestruj</button>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }
 
// export default RegistrationPage;

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

    // errors: {
    //   username: false,
    //   email: false,
    //   telephone: false,
    //   password1: false,
    //   password2: false,
    // }
  }

  // messages = {
  //   usernameError: '* Wymagane od 3 do 25 znaków. Login nie może zawierać spacji',
  //   emailError: '* Nieprawidłowy format adresu email',
  //   telephoneError: '* Wymagany numer kierunkowy',
  //   password1Error: '* Wymagane od 8 do 25 znaków',
  //   password2Error: '* Podane hasła nie są takie same'
  // }

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    const { username, email, telephone, password1, password2} = this.state;
    const validation = this.formValidation();

    // if (username.length < 3 || username.length > 25) {
    //   this.props.createMessage({ usernameLengthError: 'Nazwa użytkownika musi zawierać od 3 do 25 znaków' })
    // } 
    // else if (password1 !== password2) {
    //   this.props.createMessage({ passwordNotMatch: 'Podane hasła nie są identyczne' })
    // } else {
    //   const newUser = {
    //     username,
    //     email,
    //     telephone,
    //     password1,
    //     password2,
    //   }
    //   this.props.register(newUser)
    //   this.props.history.push('/login');
    // }

    if (validation.correct) {
      const newUser = { username, email, telephone, password1, password2 }
      this.props.register(newUser);
    } 
    // else {
    //   this.setState({
    //     errors: {
    //       username: !validation.username,
    //       email: !validation.email,
    //       telephone: !validation.telephone,
    //       password1: !validation.password1,
    //       password2: !validation.password2,
    //     }
    //   })
    // }
  }

  formValidation = () => {
    let username = false;
    let email = false;
    let telephone = false;
    // let password1 = false;
    // let password2 = false;
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

    // if (this.state.password1.length < 8 || this.state.password1.length > 25) {
    //   this.props.createMessage({ passwordLengthError: 'Hasło musi zawierać od 8 do 25 znaków' })
    // } else {
    //   password1 = true;
    // }

    // if (this.state.password2.length < 8 || this.state.password1.length > 25) {
    //   this.props.createMessage({ passwordLengthError: 'Hasło musi zawierać od 8 do 25 znaków' })
    // } else if (this.state.password2 !== this.state.password1) {
    //   this.props.createMessage({ passwordsNotMatch: 'Podane hasła nie są identyczne' })
    // } else {
    //   password2 = true;
    // }

    if (username && email && telephone) {
      correct = true;
    }

    return ({
      username,
      email,
      telephone,
      // password1,
      // password2,
      correct
    })
  }

  render() { 
    // if (this.props.isAuthenticated) {
    //   setTimeout(alert('Rejestracja przebiegła pomyślnie. Za 3 sekundy nastąpi przekierowanie na stronę logowania.'), 3000);
    //   return <Redirect to="/login" />
    // }

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
              {/* {this.state.errors.username && <p>{this.messages.usernameError}</p>} */}
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
              {/* {this.state.errors.email && <p>{this.messages.emailError}</p>} */}
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
              {/* {this.state.errors.telephone && <p>{this.messages.telephoneError}</p>} */}
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
              {/* {this.state.errors.password1 && <p>{this.messages.password1Error}</p>} */}
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
              {/* {this.state.errors.password2 && <p>{this.messages.password2Error}</p>} */}
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
  isAuthenticated: state.auth.isAuthenticated
})
 
export default connect(mapStateToProps, { register, createMessage })(RegistrationPage);