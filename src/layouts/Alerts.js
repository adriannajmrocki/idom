// import React, { Component, Fragment } from 'react';
// import { withAlert } from 'react-alert';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// export class Alerts extends Component {
//   static propTypes = {
//     error: PropTypes.object.isRequired,
//     message: PropTypes.object.isRequired
//   }

//   componentDidUpdate(prevProps) {
//     const { error, alert, message } = this.props;

//     if (error !== prevProps.error) {
//       if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
//       if (error.msg.username) alert.error(error.msg.username.join());
//     }

//     if (message !== prevProps.message) {
//       if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
//     }
//   }

//   render() { 
//     return (  
//       <Fragment />
//     );
//   }
// }

// const mapStateToProps = state => ({
//   error: state.errors,
//   message: state.messages
// });
 
// export default connect(mapStateToProps)(withAlert()(Alerts));

import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {

  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;

    if (error !== prevProps.error) {
      // if (error.msg.name.join() === 'This field may not be blank.') alert.error('Wpisz nazwę czujnika');
      // if (error.msg.name.join() === 'Sensor with provided name already exists') alert.error('Czujnik o podanej nazwie juz istnieje');
      // if (error.msg.category) alert.error('Wybierz kategorię');
    }

    if (message !== prevProps.message) {
      // Sensors alerts
      if (message.sensorDeleted) alert.success(message.sensorDeleted);
      if (message.sensorAdded) alert.success(message.sensorAdded);
      if (message.sensorUpdated) alert.success(message.sensorUpdated);
      if (message.sensorExists) alert.error(message.sensorExists);
      if (message.noSensorNameError) alert.error(message.noSensorNameError);
      if (message.noSensorCategoryError) alert.error(message.noSensorCategoryError);
      if (message.noFrequencyUnitError) alert.error(message.noFrequencyUnitError);
      if (message.noFrequencyError) alert.error(message.noFrequencyError);
      if (message.frequencyMinSecondsError) alert.error(message.frequencyMinSecondsError);
      if (message.frequencyMaxSecondsError) alert.error(message.frequencyMaxSecondsError);
      if (message.frequencyMinMinutesError) alert.error(message.frequencyMinMinutesError);
      if (message.frequencyMaxMinutesError) alert.error(message.frequencyMaxMinutesError);
      if (message.frequencyMinHoursError) alert.error(message.frequencyMinHoursError);
      if (message.frequencyMaxHoursError) alert.error(message.frequencyMaxHoursError);
      if (message.frequencyMinDaysError) alert.error(message.frequencyMinDaysError);
      if (message.frequencyMaxDaysError) alert.error(message.frequencyMaxDaysError);

      // Users alerts
      if (message.userDeleted) alert.success(message.userDeleted);
      if (message.dataNotChanged) alert.info(message.dataNotChanged);
      if (message.userUpdated) alert.success(message.userUpdated);
      if (message.userUpdateError) alert.error(message.userUpdateError);
      if (message.userUpdateDataError) alert.error(message.userUpdateDataError);

      // if (message.frequencyError) alert.error(message.frequencyError);

      // Register alerts
      if (message.usernameLengthError) alert.error(message.usernameLengthError);
      if (message.usernameSpaceError) alert.error(message.usernameSpaceError);
      if (message.emailLengthError) alert.error(message.emailLengthError);
      if (message.emailFormatError) alert.error(message.emailFormatError);
      if (message.telephoneFormatError) alert.error(message.telephoneFormatError);
      if (message.passwordLengthError) alert.error(message.passwordLengthError);
      if (message.passwordsNotMatch) alert.error(message.passwordsNotMatch);
      if (message.registerSuccess) alert.success(message.registerSuccess);
      if (message.userExists) alert.error(message.userExists);
      
      // Login alerts
      if (message.loginError) alert.error(message.loginError);
    }
  }

  render() { 
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
})
 
export default connect(mapStateToProps)(withAlert()(Alerts));