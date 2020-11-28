import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import axios from 'axios';

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { requestFirebaseNotificationPermission } from './firebaseInit'

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from './components/sensors/Dashboard';
import AdminPage from './components/users/AdminPage';
import ResetPasswordPage from './components/password/ResetPasswordPage';
import NewPasswordView from './components/password/NewPasswordPage';
import AddSensor from './components/sensors/AddSensor';
import EditSensor from './components/sensors/EditSensor';
import EditUser from './components/users/EditUser';
import Cameras from './components/Cameras/Cameras';
import AddCamera from './components/Cameras/AddCamera';
import EditCamera from './components/Cameras/EditCamera';
import Controllers from './components/Controllers/Controllers';
import AddController from './components/Controllers/AddController';
import EditController from './components/Controllers/EditController';
import Chart from './components/Chart/Chart';
import Csv from './components/Csv/Csv';

import Alerts from "./components/Alerts/Alerts";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import { Provider } from "react-redux";
import store from "./store";
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import { loadUser } from './actions/auth';
// import { sendFirebaseToken } from './actions/push';
import { baseURL } from './utils/url';

// Alert Options
const alertOptions = {
  timeout: 5000,
  position: "top center"
};

class App extends Component {

  // static propTypes = {
  //   isFirebaseTokenSent: PropTypes.bool.isRequired
  // }

  // componentDidMount() {
  //   store.dispatch(loadUser());
  // }

  render() {

  // requestFirebaseNotificationPermission()
  // .then((firebaseToken) => {
  //   // eslint-disable-next-line no-console
  //   console.log('FIREBASE TOKEN', firebaseToken);
  //   const device = 'web';
  //   const firebaseData = { device, firebaseToken }
  //   // this.props.sendFirebaseToken(firebaseData);

  //   // const token = getState().auth.token;
  //   let token = JSON.parse(localStorage.getItem('token'))
  //   console.log('user token', token);

  //   axios({
  //     method: 'post',
  //     url: `${baseURL}/devices/`,
  //     data: {
  //       registration_id: firebaseToken,
  //       type: 'web'
  //     }
  //   });

  //   console.log(firebaseData);
  // })
  // .catch((err) => {
  //   return err;
  // });

    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/register' component={Register} />
                  <Route path='/login' component={Login} />
                  <Route path='/resetpwd' component={ResetPasswordPage} />
                  <Route path='/password-reset/:token' component={NewPasswordView} />
                  <PrivateRoute path='/dashboard' component={Dashboard} />
                  <PrivateRoute path='/admin' component={AdminPage} />
                  <PrivateRoute path='/add-sensor' component={AddSensor} />
                  <PrivateRoute path='/edit-sensor/:id' component={EditSensor} />
                  <PrivateRoute path='/edit-user/:id' component={EditUser} />
                  <PrivateRoute path='/cameras' component={Cameras} />
                  <PrivateRoute path='/add-camera' component={AddCamera} />
                  <PrivateRoute path='/edit-camera/:id' component={EditCamera} />
                  <PrivateRoute path='/controllers' component={Controllers} />
                  <PrivateRoute path='/add-controller' component={AddController} />
                  <PrivateRoute path='/edit-controller/:id' component={EditController} />
                  <PrivateRoute path='/chart/:id' component={Chart} />
                  <PrivateRoute path='/csv' component={Csv} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

// const mapStateToProps = state => ({
//   isFirebaseTokenSent: state.push.isFirebaseTokenSent
// })

export default App;
