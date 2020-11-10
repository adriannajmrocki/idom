import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

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
import Controllers from './components/Controllers/Controllers';

import Alerts from "./components/Alerts/Alerts";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import { Provider } from "react-redux";
import store from "./store";

import { loadUser } from './actions/auth';

// Alert Options
const alertOptions = {
  timeout: 5000,
  position: "top center"
};

class App extends Component {

  // componentDidMount() {
  //   store.dispatch(loadUser());
  // }

  render() {
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
                  <PrivateRoute path='/controllers' component={Controllers} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
