import React, { Component, Fragment } from 'react';
import SensorsList from './SensorsList';

import { requestFirebaseNotificationPermission } from '../../firebaseInit';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { sendFirebaseToken, getFirebaseToken } from '../../actions/push';
import { baseURL } from '../../utils/url';

class Dashboard extends Component {

  static propTypes = {
    isFirebaseTokenSent: PropTypes.bool.isRequired
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
        <SensorsList />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isFirebaseTokenSent: state.push.isFirebaseTokenSent
})

export default connect(mapStateToProps, { sendFirebaseToken, getFirebaseToken })(Dashboard);