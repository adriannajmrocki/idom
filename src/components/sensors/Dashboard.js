import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SensorsList from './SensorsList';
import { baseURL } from '../../utils/url';

import { sendFirebaseToken, getFirebaseToken } from '../../actions/push';
import { requestFirebaseNotificationPermission, onMessageListener } from '../../firebaseInit';

class Dashboard extends Component {

  static propTypes = {
    isFirebaseTokenSent: PropTypes.bool.isRequired
  }

  componentDidMount() {
    onMessageListener()
    .then((payload) => {
      console.log(payload)
      console.log(payload.notification.body)
      const { body } = payload.notification.body;
      // console.log('title', title);
      // console.log('body', body);
      toast.warn(`${payload.notification.body}`, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // toast.success('test')
    })
    .catch((err) => {
      toast.error(JSON.stringify(err));
    });
  }

  render() {

    requestFirebaseNotificationPermission()
    .then((firebaseToken) => {
      // eslint-disable-next-line no-console
      console.log(firebaseToken);

      const registration_id = firebaseToken;
      const type = 'web';
      const data = { registration_id, type }

      this.props.getFirebaseToken();

      
      this.props.sendFirebaseToken(data);
      console.log('data', data);
    })
    .catch((err) => {
      return err;
    });

    return (
      <Fragment>
        <ToastContainer autoClose={8000} position="top-center" />
        <SensorsList />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isFirebaseTokenSent: state.push.isFirebaseTokenSent
})

export default connect(mapStateToProps, { sendFirebaseToken, getFirebaseToken })(Dashboard);