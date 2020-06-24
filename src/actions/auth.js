import axios from 'axios';
import { returnErrors } from './messages';

import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import auth from '../reducers/auth';


// CHECK TOKEN & LOAD USER
// export const loadUser = () => (dispatch, getState) => {

//   // User Loading
//   dispatch({ type: USER_LOADING });

//   // Get token from state
//   const token = getState().auth.token;

//   // Headers
//   const config = {
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   }

//   // If token, add to headers config
//   if (token) {
//     config.headers['Authorization'] = `Token ${token}`;
//   }

//   axios.get('http://127.0.0.1:8000/register/', config)
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


// LOGIN USER
export const login = (username, password) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  // Request Body
  const body = JSON.stringify({ username, password });

  axios.post('api/api-token-auth/', body, config)
  .then(res => {
    console.log(res.data);
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
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL
      })
    }
  })
}


// REGISTER USER
export const register = ({ username, email, telephone, password1, password2 }) => dispatch => {

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const body = JSON.stringify({ username, email, telephone, password1, password2 })

  axios.post('api/users/add', body, config)
  .then(res => {
    console.log(res.status)
    if (res.status === 201) {
      alert("Rejestracja przebiegła pomyślnie. Możesz się zalogować");
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    } 
  })
  .catch(err => {
    if (err.response.status === 400 || err.response.status === 409 || err.response.status === 500) {
      alert("Błąd rejestracji. Sprawdź poprawność danych i spróbuj ponownie")
      console.log(err.response.status)
      console.error(err);
      dispatch(returnErrors('Błąd rejestracji', err.response.status));
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

  axios.post(`api/api-logout/${token}`, null, config)
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
