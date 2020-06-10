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
      if (error.msg.non_field_errors) alert.error('Niepoprawny login lub hasło.');
      if (error.msg.name.join() === 'This field may not be blank.') alert.error('Wpisz nazwę czujnika');
      if (error.msg.name.join() === 'Sensor with provided name already exists') alert.error('Czujnik o podanej nazwie juz istnieje');
      if (error.msg.category) alert.error('Wybierz kategorię');
    }

    if (message !== prevProps.message) {
      if (message.sensorDeleted) alert.success(message.sensorDeleted);
      if (message.sensorAdded) alert.success(message.sensorAdded);
      if (message.sensorUpdated) alert.success(message.sensorUpdated);

      if (message.userDeleted) alert.success(message.userDeleted);
      if (message.dataNotChanged) alert.info(message.dataNotChanged);

      if (message.frequencyError) alert.error(message.frequencyError);
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