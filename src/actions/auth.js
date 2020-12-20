import axios from 'axios';

import { createMessage, returnErrors } from './messages';
import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import auth from '../reducers/auth';
import { baseURL } from '../utils/url';


// CHECK TOKEN & LOAD USER
// export const loadUser = () => (dispatch, getState) => {

  // User Loading
  // dispatch({ type: USER_LOADING });

  // Get token from state
  // const token = getState().auth.token;

  // Headers
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  // }

  // If token, add to headers config
  // if (token) {
//     config.headers['Authorization'] = `Token ${token}`;
//   }

//   axios.get('http://127.0.0.1:8000/api-token-auth/', config)
//     .then(res => {
//       console.log(res);
//       dispatch({
//         type: USER_LOADED,
//         payload: res.data
//       })
//     })
//     .catch(err => {
//       dispatch(returnErrors(err.response.data, err.response.status));
//       dispatch({
//         type: AUTH_ERROR
//       })
//     })
// }

// http://127.0.0.1:8000

// LOGIN USER
export const login = (username, password) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  // const host = 'https://tauriform-wren-7690.dataplicity.io/';
  // axios.defaults.baseURL = host;
  // axios.defaults.port = 8001;

  // Request Body
  const body = JSON.stringify({ username, password });

  axios.post(`${baseURL}/api-token-auth/`, body, config)
  .then(res => {
    // console.log(res);
    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    }
  })
  .catch(err => {
    console.log(err.response.data)
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
    console.log(res.status)
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
    console.log(res);
    dispatch({
      type: LOGOUT_SUCCESS
    })
  })
  .catch(err => {
    console.log(err);
    dispatch(returnErrors('Błąd wylogowania', err.response.status));
  })
}
