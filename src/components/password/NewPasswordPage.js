import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetPassword } from '../../actions/password';
import { createMessage } from '../../actions/messages';
import Alerts from '../Alerts/Alerts';

class NewPasswordView extends Component {
  state = {  
    password: '',
  }

  static propTypes = {
    resetPassword: PropTypes.func.isRequired,
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    console.log(this.state);
  }

  handleSubmit = e => {
    e.preventDefault();

    const { password } = this.state;
    const token = this.props.match.params.token;
   
    // if (password.length < 8 || password.length > 25) {
    //   this.props.createMessage({ passwordLengthError: 'Hasło musi zawierać od 8 do 25 znaków' })
    // } else this.props.resetPassword({password, token})
    this.props.resetPassword({ password, token })
    this.setState({ password: '' })
  }

  render() { 
    return (  
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Nowe hasło</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Nowe hasło</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                />
            </div>
            {/* <div className="form-group">
              <label>Powtórz nowe hasło</label>
                <input
                  type="password"
                  className="form-control"
                  name="password2"
                  onChange={this.handleChange}
                  value={this.state.password2}
                />
            </div> */}
            {/* <div className="form-group">
              <label>Token</label>
                <input
                  type="text"
                  className="form-control"
                  name="token"
                  onChange={this.handleChange}
                  value={this.state.token}
                />
            </div> */}
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Potwierdź</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  resetPassword: state.password
})

const mapDispatchToProps = dispatch => ({
  resetPassword: data => dispatch(resetPassword(data))
})

const NewPasswordPage = connect(
  mapStateToProps,
  mapDispatchToProps
 )(NewPasswordView);
 
 export default withRouter(NewPasswordPage);

// const mapStateToProps = state => ({
//   resetPassword: state.password
// })
 
// export default connect(mapStateToProps, { resetPassword })(NewPasswordPage);