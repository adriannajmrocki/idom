import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetPassword } from '../../actions/password';
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
   
    this.props.resetPassword({ password, token })
    this.setState({ password: '' })
  }

  render() { 
    return (  
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5 custom-border-style">
          <h2 className="text-center custom-mb">Nowe hasło</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Nowe hasło</label>
                <input
                  type="password"
                  className="form-control custom-input-style"
                  name="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                />
            </div>
            <div className="ff-center">
              <button type="submit" className="button">Potwierdź</button>
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