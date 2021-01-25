import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { updateUser, getUserData } from '../../actions/users';
import { createMessage } from '../../actions/messages';
import Alerts from '../Alerts/Alerts';

class EditUser extends Component {

  state = {  
    email: '',
    telephone: '',
    language: '',
    app_notifications: '',
    sms_notifications: '',
  }

  static propTypes = {
    updateUser: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    telephone: PropTypes.string,
    language: PropTypes.string.isRequired,
    appNotifications: PropTypes.string.isRequired,
    smsNotifications: PropTypes.string.isRequired,
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

  handleLangSelect = e => {
    this.setState({ language: e.target.value })
  }

  handleSubmit = (e, dispatch) => {
    e.preventDefault();
    console.log('EDIT USER SUBMIT');
    console.log(`EMAIL: ${this.state.email}, TELEPHONE: ${this.state.telephone}, APP: ${this.state.app_notifications}, SMS: ${this.state.sms_notifications}`)

    const id = this.props.match.params.id;

    let { email, telephone, language, app_notifications, sms_notifications } = this.state;
    let userData = { email, telephone, language, app_notifications, sms_notifications };

    if (!email) {
      email = undefined;
      userData = { email, telephone, language, app_notifications, sms_notifications };
    }

    if (!telephone) {
      telephone = undefined;
      userData = { email, telephone, language, app_notifications, sms_notifications };
    }

    if (!app_notifications) {
      app_notifications = undefined;
      userData = { email, telephone, language, app_notifications, sms_notifications };
    }

    if (!sms_notifications) {
      sms_notifications = undefined;
      userData = { email, telephone, language, app_notifications, sms_notifications };
    }

    if (!language) {
      language = undefined;
      userData = { email, telephone, language, app_notifications, sms_notifications };
    }

    if (email === undefined && telephone === undefined && language === undefined && app_notifications === undefined && sms_notifications === undefined) {
      this.props.createMessage({ dataNotChanged: 'Żadne dane nie zostały zmienione' });
    } else {
      this.props.updateUser(id, userData);
    }

    this.setState({
      email: '',
      telephone: '',
      language: '',
      app_notifications: '',
      sms_notifications: '',
    })
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.getUserData(id);
  }

  render() { 

    const { t } = this.props;

    return (  
      <div className="col-md-6 m-auto custom-position">
        <div className="card card-body mt-5 custom-border-style custom-position">
          <h2 className="text-center custom-mb">{t('users.edit-usr')}</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control custom-input-style"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
                placeholder={this.props.email}
              />
            </div>
            <div className="form-group">
              <label>{t('home.phone-number')}</label>
              <input
                type="text"
                className="form-control custom-input-style"
                name="telephone"
                onChange={this.handleChange}
                value={this.state.telephone}
                placeholder={this.props.telephone}
              />
            </div>
            <div className="form-group">
              <label>{t('home.notifications-lng')}</label>
              <select className="form-control custom-input-style" onChange={this.handleLangSelect} value={this.state.language}>
                <option value="" disabled defaultValue>{this.props.language === 'pl' ? `${t('home.pl')}` : `${t('home.en')}`}</option>
                <option value="pl">{t('home.pl')}</option>
                <option value="eng">{t('home.en')}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('users.app-not')}</label>
              <select className="form-control custom-input-style" onChange={this.handleAppSelect} value={this.state.app_notifications}>
                <option value="" disabled defaultValue>{this.props.appNotifications === 'true' ? `${t('users.yes')}` : `${t('users.no')}`}</option>
                <option value="true">{t('users.yes')}</option>
                <option value="false">{t('users.no')}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('users.sms-not')}</label>
              <select className="form-control custom-input-style" onChange={this.handleSmsSelect} value={this.state.sms_notifications}>
                <option value="" disabled defaultValue>{this.props.smsNotifications === 'true' ? `${t('users.yes')}` : `${t('users.no')}`}</option>
                <option value="true">{t('users.yes')}</option>
                <option value="false">{t('users.no')}</option>
              </select>
            </div>
            <div className="ff-center">
              <button className="button">{t('sensors.edit')}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  email: state.users.email,
  telephone: state.users.telephone,
  language: state.users.language,
  appNotifications: state.users.appNotifications,
  smsNotifications: state.users.smsNotifications,
})
 
export default withTranslation('common')(connect(mapStateToProps, { updateUser, createMessage, getUserData })(EditUser));