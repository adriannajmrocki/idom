import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  username: localStorage.getItem('username'),
  isAuthenticated: localStorage.getItem('token') ? true : false,
  isLoading: false,
  user: null,
  isRegistered: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isRegistered: true
      }
    case LOGIN_SUCCESS:
    // case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('username', action.payload.username);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        // user: action.payload
      }
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }
    default:
      return state;
  }
}

