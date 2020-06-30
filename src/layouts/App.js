import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./Header";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import Dashboard from '../pages/Dashboard';
import AdminPage from '../pages/AdminPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import NewPasswordView from '../pages/NewPasswordPage';
import AddSensorPage from '../pages/AddSensorPage';
import EditSensorPage from '../pages/EditSensorPage';
import EditUserPage from '../pages/EditUserPage';
import ChartPage from '../pages/ChartPage';
import Alerts from "./Alerts";
import PrivateRoute from '../components/PrivateRoute';

import { Provider } from "react-redux";
import store from "../store";

import { loadUser } from '../actions/auth';

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
                  <Route exact path='/' component={HomePage} />
                  <Route path='/register' component={RegistrationPage} />
                  <Route path='/login' component={LoginPage} />
                  <Route path='/resetpwd' component={ResetPasswordPage} />
                  <Route path='/password-reset/:token' component={NewPasswordView} />
                  <PrivateRoute path='/dashboard' component={Dashboard} />
                  <PrivateRoute path='/admin' component={AdminPage} />
                  <PrivateRoute path='/add-sensor' component={AddSensorPage} />
                  <PrivateRoute path='/edit-sensor/:id' component={EditSensorPage} />
                  <PrivateRoute path='/edit-user/:id' component={EditUserPage} />
                  <PrivateRoute path='/chart/:id' component={ChartPage} />
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
