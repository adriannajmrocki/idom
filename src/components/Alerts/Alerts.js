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
      if (message.sensorUpdated) alert.success(t('messages.sensorUpdated'));
      if (message.sensorExists) alert.error(t('messages.sensorExists'));
      if (message.noSensorNameError) alert.error(t('messages.noSensorNameError'));
      if (message.noSensorCategoryError) alert.error(t('messages.noSensorCategoryError'));
      if (message.noFrequencyUnitError) alert.error(t('messages.noFrequencyUnitError'));
      if (message.noFrequencyError) alert.error(t('messages.noFrequencyError'));
      if (message.frequencyMinSecondsError) alert.error(t('messages.frequencyMinSecondsError'));
      if (message.frequencyMaxSecondsError) alert.error(t('messages.frequencyMaxSecondsError'));
      if (message.frequencyMinMinutesError) alert.error(t('messages.frequencyMinMinutesError'));
      if (message.frequencyMaxMinutesError) alert.error(t('messages.frequencyMaxMinutesError'));
      if (message.frequencyMinHoursError) alert.error(t('messages.frequencyMinHoursError'));
      if (message.frequencyMaxHoursError) alert.error(t('messages.frequencyMaxHoursError'));
      if (message.frequencyMinDaysError) alert.error(t('messages.frequencyMinDaysError'));
      if (message.frequencyMaxDaysError) alert.error(t('messages.frequencyMaxDaysError'));
      if (message.noChartData) alert.info(t('messages.noChartData'));

      // Users alerts
      if (message.userDeleted) alert.success(t('messages.userDeleted'));
      if (message.dataNotChanged) alert.info(t('messages.dataNotChanged'));
      if (message.userUpdated) alert.success(t('messages.userUpdated'));
      if (message.userUpdateError) alert.error(t('messages.userUpdateError'));
      if (message.userUpdateDataError) alert.error(t('messages.userUpdateDataError'));

      // Register alerts
      if (message.usernameLengthError) alert.error(t('messages.usernameLengthError'));
      if (message.usernameSpaceError) alert.error(t('messages.usernameSpaceError'));
      if (message.emailLengthError) alert.error(t('messages.emailLengthError'));
      if (message.emailFormatError) alert.error(t('messages.emailFormatError'));
      if (message.telephoneFormatError) alert.error(t('messages.telephoneFormatError'));
      if (message.passwordLengthError) alert.error(t('messages.passwordLengthError'));
      if (message.passwordsNotMatch) alert.error(t('messages.passwordsNotMatch'));
      if (message.registerSuccess) alert.success(t('messages.registerSuccess'));
      if (message.userExists) alert.error(t('messages.userExists'));
      if (message.languageError) alert.error(t('messages.languageError'));
      
      // Login alerts
      if (message.loginError) alert.error(t('messages.loginError'));

      // Password reset alerts
      if (message.resetPasswordEmailSuccess) alert.success(t('messages.resetPasswordEmailSuccess'));
      if (message.resetPasswordEmailError) alert.error(t('messages.resetPasswordEmailError'));
      if (message.resetPasswordSuccess) alert.success(t('messages.resetPasswordSuccess'));
      if (message.resetPasswordError) alert.error(t('messages.resetPasswordError'));

      // Cameras alerts
      if (message.cameraAdded) alert.success(t('messages.cameraAdded'));
      if (message.cameraExists) alert.error(t('messages.cameraExists'));
      if (message.cameraDeleted) alert.success(t('messages.cameraDeleted'));
      if (message.cameraUpdated) alert.success(t('messages.cameraUpdated'));

      // Controllers alerts
      if (message.controllerAdded) alert.success(t('messages.controllerAdded'));
      if (message.controllerExists) alert.error(t('messages.controllerExists'));
      if (message.controllerDeleted) alert.success(t('messages.controllerDeleted'));
      if (message.controllerUpdated) alert.success(t('messages.controllerUpdated'));
      if (message.noDataError) alert.error(t('messages.noDataError'));
      if (message.controllerRunning) alert.success(t('messages.controllerRunning'));
      if (message.controllerRunError) alert.error(t('messages.controllerRunError'));
      if (message.bulbDataSent) alert.success(t('messages.bulbDataSent'));
      if (message.bulbDataSentError) alert.error(t('messages.bulbDataSentError'));
      if (message.ipError) alert.error(t('messages.ipError'));

      // CSV alerts
      if (message.noItems) alert.error(t('messages.noItems'));
      if (message.noFilter) alert.error(t('messages.noFilter'));
      if (message.daysError) alert.error(t('messages.daysError'));
      if (message.csvAccepted) alert.success(t('messages.csvAccepted'));

      // Actions alerts
      if (message.actionAdded) alert.success(t('messages.actionAdded'));
      if (message.actionDeleted) alert.success(t('messages.actionDeleted'));
      if (message.actionExists) alert.error(t('messages.actionExists'));
      if (message.emptyFieldsError) alert.error(message.emptyFieldsError);
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