// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/LoginPage.css';

// class LoginPage extends Component {
//   state = {
//     username: "",
//     password: "",
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

//     if (this.state.username === "idom" && this.state.password === "idom") {
//       alert("OK");
//     } else {
//       alert("ERROR");
//     }

//     this.setState({
//       username: "",
//       password: "",
//     })
//   }

//   render() {
//     const { username, password } = this.state;

//     return (  
//       <div id="container-login">
//         <div id="content-login">
//           <h1>LOGOWANIE</h1>
//           <div className="bottom-line"></div>
//           <form action="" onSubmit={this.handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="username">Login</label>
//               <input type="text" name="username" id="username" value={username} onChange={this.handleChange} />
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">Hasło</label>
//               <input type="password" name="password" id="password" value={password} onChange={this.handleChange} />
//             </div>

//             <button>Zaloguj</button>
//             <p>Zapomniałeś/aś hasła? <Link to="/">Zresetuj</Link></p>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }
 
// export default LoginPage;

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';

class LoginPage extends Component {
  state = {  
    username: '',
    password: ''
  }

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
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