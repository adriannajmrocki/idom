import { combineReducers } from 'redux';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import users from './users';

export default combineReducers({
  users,
  errors,
  messages,
  auth
});