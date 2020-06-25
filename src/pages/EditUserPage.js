import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateUser } from '../actions/users';
import { createMessage } from '../actions/messages';
import Alerts from '../layouts/Alerts';
import axios from 'axios';

class EditUserPage extends Component {

  state = {  
    email: '',
    telephone: '',
    app_notifications: '',
    sms_notifications: '',
  }

  static propTypes = {
    updateUser: PropTypes.func.isRequired,
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleAppSelect = e => {
    this.setState({ app_notifications: e.target.value })
  }

  handleSmsSelect = e => {
    this.setState({ sms_notifications: e.target.value })
  }

  handleSubmit = (e, dispatch) => {
    e.preventDefault();
    console.log('EDIT USER SUBMIT');
    console.log(`EMAIL: ${this.state.email}, TELEPHONE: ${this.state.telephone}, APP: ${this.state.app_notifications}, SMS: ${this.state.sms_notifications}`)

    const id = this.props.match.params.id;

    let { email, telephone, app_notifications, sms_notifications } = this.state;
    let userData = { email, telephone, app_notifications, sms_notifications };

    if (!email) {
      email = undefined;
      userData = { email, telephone, app_notifications, sms_notifications };
    }

    if (!telephone) {
      telephone = undefined;
      userData = { email, telephone, app_notifications, sms_notifications };
    }

    if (!app_notifications) {
      app_notifications = undefined;
      userData = { email, telephone, app_notifications, sms_notifications };
    }

    if (!sms_notifications) {
      sms_notifications = undefined;
      userData = { email, telephone, app_notifications, sms_notifications };
    }

    if (email === undefined && telephone === undefined && app_notifications === undefined && sms_notifications === undefined) {
      this.props.createMessage({ dataNotChanged: 'Żadne dane nie zostały zmienione' });
    } else {
      this.props.updateUser(id, userData);
    }

    this.setState({
      email: '',
      telephone: '',
      app_notifications: '',
      sms_notifications: '',
    })
  }

  render() { 
    return (  
      <div className="col-md-6 m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">Edytuj użytkownika</h2>
        <form onSubmit={this.handleSubmit}>
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
            <label>Numer telefonu</label>
            <input
              type="text"
              className="form-control"
              name="telephone"
              onChange={this.handleChange}
              value={this.state.telephone}
            />
          </div>
          <div className="form-group">
            <label>Powiadomienia w aplikacji</label>
            <select className="form-control" onChange={this.handleAppSelect} value={this.state.app_notifications}>
              <option></option>
              <option value="true">TAK</option>
              <option value="false">NIE</option>
            </select>
          </div>
          <div className="form-group">
            <label>Powiadomienia SMS</label>
            <select className="form-control" onChange={this.handleSmsSelect} value={this.state.sms_notifications}>
              <option></option>
              <option value="true">TAK</option>
              <option value="false">NIE</option>
            </select>
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Potwierdź</button>
          </div>
        </form>
      </div>
    </div>
    );
  }
}
 
export default connect(null, { updateUser, createMessage })(EditUserPage);