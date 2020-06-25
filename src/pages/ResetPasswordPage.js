import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { createMessage } from '../actions/messages';
import Alerts from '../layouts/Alerts';

class ResetPasswordPage extends Component {
  state = {  
    email: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  reset = email => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    const body = JSON.stringify({ email })

    axios.post('http://127.0.0.1:8000/password-reset/', body, config)
    .then(res => {
      console.log(res);
      if (res.status === 200) {
        this.props.createMessage({ resetPasswordEmailSuccess: 'Na podany adres email został wysłany link do zmiany hasła' })
      }
    })
    .catch(err => {
      if (err.response.status === 400) {
        this.props.createMessage({ resetPasswordEmailError: 'Konto o podanym adresie email nie istnieje' })
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault();

    if (!this.state.email.match(/^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+/)) {
      this.props.createMessage({ emailFormatError: 'Nieprawidłowy format adresu email' });
    } else {
      this.reset(this.state.email);
    }
  }

  render() { 
    return (  
      <Fragment>
        <div className="col-md-6 m-auto">
          <div className="card card-body mt-5">
            <h2 className="text-center">Reset hasła</h2>
            <form onSubmit={this.handleSubmit} noValidate>
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
                <button type="submit" className="btn btn-primary">Potwierdź</button>
            </div>
              <p>
                * Na podany adres email zostanie wysłany link umożliwiający zmianę hasła.
              </p>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}
 
export default connect(null, { createMessage })(ResetPasswordPage);