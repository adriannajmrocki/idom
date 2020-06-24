import { combineReducers } from 'redux';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import users from './users';
import sensors from './sensors';
import password from './password';

export default combineReducers({
  users,
  sensors,
  errors,
  messages,
  auth,
  password
});