import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

export class Alerts extends Component {

  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  }

  componentDidUpdate(prevProps) {
    const { alert, message, t } = this.props;

    if (message !== prevProps.message) {
      // Sensors alerts
      if (message.sensorDeleted) alert.success(t('messages.sensorDeleted'));
      if (message.sensorAdded) alert.success(t('messages.sensorAdded'));
      if (message.sensorUpdated) alert.success(t('message.sensorUpdated'));
      if (message.sensorExists) alert.error(t('message.sensorExists'));
      if (message.noSensorNameError) alert.error(t('message.noSensorNameError'));
      if (message.noSensorCategoryError) alert.error(t('message.noSensorCategoryError'));
      if (message.noFrequencyUnitError) alert.error(t('message.noFrequencyUnitError'));
      if (message.noFrequencyError) alert.error(t('message.noFrequencyError'));
      if (message.frequencyMinSecondsError) alert.error(t('message.frequencyMinSecondsError'));
      if (message.frequencyMaxSecondsError) alert.error(t('message.frequencyMaxSecondsError'));
      if (message.frequencyMinMinutesError) alert.error(t('message.frequencyMinMinutesError'));
      if (message.frequencyMaxMinutesError) alert.error(t('message.frequencyMaxMinutesError'));
      if (message.frequencyMinHoursError) alert.error(t('message.frequencyMinHoursError'));
      if (message.frequencyMaxHoursError) alert.error(t('message.frequencyMaxHoursError'));
      if (message.frequencyMinDaysError) alert.error(t('message.frequencyMinDaysError'));
      if (message.frequencyMaxDaysError) alert.error(t('message.frequencyMaxDaysError'));
      if (message.noChartData) alert.info(t('message.noChartData'));

      // Users alerts
      if (message.userDeleted) alert.success(t('message.userDeleted'));
      if (message.dataNotChanged) alert.info(t('message.dataNotChanged'));
      if (message.userUpdated) alert.success(t('message.userUpdated'));
      if (message.userUpdateError) alert.error(t('message.userUpdateError'));
      if (message.userUpdateDataError) alert.error(t('message.userUpdateDataError'));

      // Register alerts
      if (message.usernameLengthError) alert.error(t('message.usernameLengthError'));
      if (message.usernameSpaceError) alert.error(t('message.usernameSpaceError'));
      if (message.emailLengthError) alert.error(t('message.emailLengthError'));
      if (message.emailFormatError) alert.error(t('message.emailFormatError'));
      if (message.telephoneFormatError) alert.error(t('message.telephoneFormatError'));
      if (message.passwordLengthError) alert.error(t('message.passwordLengthError'));
      if (message.passwordsNotMatch) alert.error(t('message.passwordsNotMatch'));
      if (message.registerSuccess) alert.success(t('message.registerSuccess'));
      if (message.userExists) alert.error(t('message.userExists'));
      if (message.languageError) alert.error(t('message.languageError'));
      
      // Login alerts
      if (message.loginError) alert.error(t('message.loginError'));

      // Password reset alerts
      if (message.resetPasswordEmailSuccess) alert.success(t('message.resetPasswordEmailSuccess'));
      if (message.resetPasswordEmailError) alert.error(t('message.resetPasswordEmailError'));
      if (message.resetPasswordSuccess) alert.success(t('message.resetPasswordSuccess'));
      if (message.resetPasswordError) alert.error(t('message.resetPasswordError'));

      // Cameras alerts
      if (message.cameraAdded) alert.success(t('message.cameraAdded'));
      if (message.cameraExists) alert.error(t('message.cameraExists'));
      if (message.cameraDeleted) alert.success(t('message.cameraDeleted'));
      if (message.cameraUpdated) alert.success(t('message.cameraUpdated'));

      // Controllers alerts
      if (message.controllerAdded) alert.success(t('message.controllerAdded'));
      if (message.controllerExists) alert.error(t('message.controllerExists'));
      if (message.controllerDeleted) alert.success(t('message.controllerDeleted'));
      if (message.controllerUpdated) alert.success(t('message.controllerUpdated'));
      if (message.noDataError) alert.error(t('message.noDataError'));
      if (message.controllerRunning) alert.success(t('message.controllerRunning'));
      if (message.controllerRunError) alert.error(t('message.controllerRunError'));
      if (message.bulbDataSent) alert.success(t('message.bulbDataSent'));
      if (message.bulbDataSentError) alert.error(t('message.bulbDataSentError'));

      // CSV alerts
      if (message.noItems) alert.error(t('message.noItems'));
      if (message.noFilter) alert.error(t('message.noFilter'));
      if (message.daysError) alert.error(t('message.daysError'));
      if (message.csvAccepted) alert.success(t('message.csvAccepted'));

      // Actions alerts
      if (message.actionAdded) alert.success(t('message.actionAdded'));
      if (message.actionDeleted) alert.success(t('message.actionDeleted'));
      if (message.actionExists) alert.error(t('message.actionExists'));
    }
  }

  render() { 
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  message: state.messages
})
 
export default withTranslation('common')(connect(mapStateToProps)(withAlert()(Alerts)));