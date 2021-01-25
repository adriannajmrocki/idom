import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SensorsList from './SensorsList';

import { sendFirebaseToken, getFirebaseToken } from '../../actions/push';

class Dashboard extends Component {

  static propTypes = {
    isFirebaseTokenSent: PropTypes.bool.isRequired
  }

  render() {

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