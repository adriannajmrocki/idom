import axios from 'axios';

import { createMessage } from './messages';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, AUTH_ERROR } from './types';
import { baseURL } from '../utils/url';

// LOGIN USER
export const login = (username, password) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  // Request Body
  const body = JSON.stringify({ username, password });

  axios.post(`${baseURL}/api-token-auth/`, body, config)
  .then(res => {
    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    }
  })
  .catch(err => {
    if (err.response.status === 400) {
      dispatch(createMessage({ loginError: 'Nieprawidłowy login lub hasło. Spróbuj ponownie' }));
      dispatch({
        type: LOGIN_FAIL
      })
    }
  })
}


// REGISTER USER
export const register = ({ username, email, telephone, password1, password2, language }) => dispatch => {

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const body = JSON.stringify({ username, email, telephone, password1, password2, language })

  axios.post(`${baseURL}/users/add`, body, config)
  .then(res => {
    if (res.status === 201) {
      dispatch(createMessage({ registerSuccess: 'Rejestracja przebiegła pomyślnie. Możesz się zalogować' }))
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    } 
  })
  .catch(err => {
    if (err.response.status === 400) {
      dispatch(createMessage({ userExists: 'Taki użytkownik już istnieje. Spróbuj ponownie' }));
      dispatch({
        type: REGISTER_FAIL
      })
    }
  })
}


// LOGOUT USER
export const logout = () => (dispatch, getState) => {

  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  }

  axios.post(`${baseURL}/api-logout/${token}`, null, config)
  .then(res => {
    dispatch({
      type: LOGOUT_SUCCESS
    })
  })
  .catch(err => {
    if (err.response.status === 401) {
      dispatch({
        type: AUTH_ERROR
      })
    }
  })
}
