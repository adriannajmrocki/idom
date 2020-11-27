// import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';

// import { updateUser, getUserData } from '../../actions/users';
// import { createMessage } from '../../actions/messages';
// import Alerts from '../Alerts/Alerts';

// const EditUser = (props) => {

//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [telephone, setTelephone] = useState('');
//   const [app_notifications, setAppNotifications] = useState('');
//   const [sms_notifications, setSmsNotifications] = useState('');

//   useEffect(() => {
//     const id = props.match.params.id;
//     let usernameByID = props.users.map(user => id === user.id ? user.username : null)
//     setUsername(usernameByID);
//     console.log('username ' + username);
//     console.log('usernameByID ' + usernameByID);
//     // props.getUserData(username);
//   }, [])

//   const handleChange = e => {
//     console.log(e.target.value);
//   }

//   const handleAppSelect = e => {
//     console.log(e.target.value);
//   }

//   const handleSmsSelect = e => {
//     console.log(e.target.value);
//   }

//   const handleSubmit = e => {
//     console.log('submit');
//   }

//   return (
//     <div className="col-md-6 m-auto">
//       <div className="card card-body mt-5">
//         <h2 className="text-center">Edytuj użytkownika</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               className="form-control"
//               name="email"
//               onChange={handleChange}
//               value={email}
//               placeholder={props.email}
//             />
//           </div>
//           <div className="form-group">
//             <label>Numer telefonu z kierunkowym (opcjonalnie)</label>
//             <input
//               type="text"
//               className="form-control"
//               name="telephone"
//               onChange={handleChange}
//               value={telephone}
//               placeholder={props.telephone}
//             />
//           </div>
//           <div className="form-group">
//             <label>Powiadomienia w aplikacji</label>
//             <select className="form-control" onChange={handleAppSelect} value={app_notifications}>
//               <option value="" disabled selected>{props.appNotifications === 'true' ? 'TAK' : 'NIE'}</option>
//               <option value="true">TAK</option>
//               <option value="false">NIE</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Powiadomienia SMS</label>
//             <select className="form-control" onChange={handleSmsSelect} value={sms_notifications}>
//               <option value="" disabled selected>{props.smsNotifications === 'true' ? 'TAK' : 'NIE'}</option>
//               <option value="true">TAK</option>
//               <option value="false">NIE</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <button className="btn btn-primary">Potwierdź</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// const mapStateToProps = state => ({
//   users: state.users.users,
//   username: state.users.username,
//   email: state.users.email,
//   telephone: state.users.telephone,
//   appNotifications: state.users.appNotifications,
//   smsNotifications: state.users.smsNotifications,
// })
 
// export default connect(mapStateToProps, { updateUser, getUserData, createMessage })(EditUser);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateUser, getUserData } from '../../actions/users';
import { createMessage } from '../../actions/messages';
import Alerts from '../Alerts/Alerts';
import axios from 'axios';

class EditUser extends Component {

  state = {  
    email: '',
    telephone: '',
    app_notifications: '',
    sms_notifications: '',
  }

  static propTypes = {
    updateUser: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    telephone: PropTypes.string,
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

  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.getUserData(id);
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
              placeholder={this.props.email}
            />
          </div>
          <div className="form-group">
            <label>Numer telefonu z kierunkowym (opcjonalnie)</label>
            <input
              type="text"
              className="form-control"
              name="telephone"
              onChange={this.handleChange}
              value={this.state.telephone}
              placeholder={this.props.telephone}
            />
          </div>
          <div className="form-group">
            <label>Powiadomienia w aplikacji</label>
            <select className="form-control" onChange={this.handleAppSelect} value={this.state.app_notifications}>
              <option value="" disabled selected>{this.props.appNotifications === 'true' ? 'TAK' : 'NIE'}</option>
              <option value="true">TAK</option>
              <option value="false">NIE</option>
            </select>
          </div>
          <div className="form-group">
            <label>Powiadomienia SMS</label>
            <select className="form-control" onChange={this.handleSmsSelect} value={this.state.sms_notifications}>
              <option value="" disabled selected>{this.props.smsNotifications === 'true' ? 'TAK' : 'NIE'}</option>
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

const mapStateToProps = state => ({
  // username: state.users.username,
  email: state.users.email,
  telephone: state.users.telephone,
  appNotifications: state.users.appNotifications,
  smsNotifications: state.users.smsNotifications,
})
 
export default connect(mapStateToProps, { updateUser, createMessage, getUserData })(EditUser);