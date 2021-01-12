import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from "./components/Alerts/Alerts";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Dashboard from './components/Sensors/Dashboard';
import AdminPage from './components/Users/AdminPage';
import ResetPasswordPage from './components/Password/ResetPasswordPage';
import NewPasswordView from './components/Password/NewPasswordPage';
import AddSensor from './components/Sensors/AddSensor';
import EditSensor from './components/Sensors/EditSensor';
import EditUser from './components/Users/EditUser';
import Cameras from './components/Cameras/Cameras';
import AddCamera from './components/Cameras/AddCamera';
import EditCamera from './components/Cameras/EditCamera';
import Controllers from './components/Controllers/Controllers';
import AddController from './components/Controllers/AddController';
import EditController from './components/Controllers/EditController';
import Chart from './components/Chart/Chart';
import Csv from './components/Csv/Csv';
import BulbColor from './components/Controllers/BulbColor';
import Actions from './components/Actions/Actions';
import AddAction from './components/Actions/AddAction';
import EditAction from './components/Actions/EditAction';
import Board from './components/Board/Board';
import BulbIp from './components/Controllers/BulbIp';

// Alert Options
const alertOptions = {
  timeout: 5000,
  position: "top center"
};

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
                <Switch>
                  <Route exact path='/' component={Home} />
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
                  <PrivateRoute path='/bulb-color/:id' component={BulbColor} />
                  <PrivateRoute path='/actions' component={Actions} />
                  <PrivateRoute path='/add-action/' component={AddAction} />
                  <PrivateRoute path='/edit-action/:id' component={EditAction} />
                  <PrivateRoute path='/board' component={Board} />
                  <PrivateRoute path='/bulb-ip/:id' component={BulbIp} />
                </Switch>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

function RootApp() {
  return (
    <React.Suspense fallback="Loading...">
      <App />
    </React.Suspense>
  )
}

export default RootApp;
