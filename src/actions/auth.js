import axios from 'axios';
import { returnErrors } from './messages';
import Cookies from '../components/Cookies';

import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types';


// CHECK TOKEN AND LOAD USER
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
  //   mode: 'no-cors'
  // }

  // If token, add to headers config
  // if (token) {
  //   config.headers['Authorization'] = `Token ${token}`;
  // }

  // axios.get('http://127.0.0.1:8000/register/', config)
    // .then(res => {
    //   dispatch({
    //     type: USER_LOADED,
    //     payload: res.data
    //   })
    // })
    // .catch(err => {
    //   dispatch(returnErrors(err.response.data, err.response.status));
    //   dispatch({
    //     type: AUTH_ERROR
    //   })
    // })
// }

const csrfToken = Cookies('csrftoken')

//LOGIN USER
export const login = (username, password) => dispatch => {
 
  fetch('http://127.0.0.1:8000/login/', {
     method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken
    },
    credentials: 'include',
    body: JSON.stringify({ username, password })
  }).then(response => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data
      })
    }).catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL
      })
    })     
}


// REGISTER USER
export const register = ({ username, password1, password2, email, telephone }) => dispatch => {

  fetch('http://127.0.0.1:8000/register/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ username, password1, password2, email, telephone })
    }).then(response => response.json())
    .then(response => {
      console.log(response);
        dispatch({
          type: REGISTER_SUCCESS,
          payload: response.data
        })
      }).catch(err => {
        console.log(err)
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: REGISTER_FAIL
        })
      })     
}



// LOGOUT USER
// export const logout = () => (dispatch, getState) => {
//   // Get token from state
//   const token = getState().auth.token;

//   // Headers
//   const config = {
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     mode: 'no-cors'
//   }

//   // If token, add to headers config
//   if (token) {
//     config.headers['Authorization'] = `Token ${token}`;
//   }

//   fetch('http://127.0.0.1:8000/register/', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       mode: 'no-cors',
//       // body: JSON.stringify(this.state)
//     }).then(response => {
//         dispatch({
//           type: LOGOUT_SUCCESS
//         })
//       }).catch(err => {
//         dispatch(returnErrors(err.response.data, err.response.status));
//       }) 
//     }
