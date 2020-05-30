import { combineReducers } from 'redux';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import users from './users';
import sensors from './sensors';

export default combineReducers({
  users,
  sensors,
  errors,
  messages,
  auth
});