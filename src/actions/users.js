import axios from 'axios';

import { GET_USERS, DELETE_USER, UPDATE_USER, GET_USER_DATA, AUTH_ERROR } from './types';
import { createMessage } from './messages';
import { baseURL } from '../utils/url';

// GET USERS
// Returns list of users
export const getUsers = () => (dispatch, getState) => {
    // Get token from state
    const token = getState().auth.token;
  
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }

  axios.get(`${baseURL}/users/list`, config)
  .then(res => {
    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  })
  .catch(err => {
    if (err.response.status === 401) {
      dispatch({
        type: AUTH_ERROR
      })
    }
  });
}

// GET USER DATA
// Returns data of user
export const getUserData = (id) => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  }

  axios.get(`${baseURL}/users/frontdetail/${id}`, config)
  .then(res => {
    if (res.status === 200) {
      dispatch({
        type: GET_USER_DATA,
        payload: res.data
      })
    }
  })
  .catch(err => {
    if (err.response.status === 401) {
      dispatch({
        type: AUTH_ERROR
      })
    }
  })
}


// DELETE USER
export const deleteUser = id => (dispatch, getState) => {

  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  axios.delete(`${baseURL}/users/delete/${id}`, config)
  .then(res => {
    dispatch(createMessage({ userDeleted: 'Użytkownik został usunięty' }))
    dispatch({
      type: DELETE_USER,
      payload: id
    });
  })
  .catch(err => {
    if (err.response.status === 401) {
      dispatch({
        type: AUTH_ERROR
      })
    }
  });
}


// UPDATE USER
// Update user's data
export const updateUser = (id, userData) => (dispatch, getState) => {

  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // If token exists, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`
  }

  // Put request to API
  axios.put(`${baseURL}/users/update/${id}`, userData, config)
  .then(res => {
    if (res.status === 200) {
      dispatch(createMessage({ userUpdated: 'Dane użytkownika zostały zmodyfikowane' }))
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      })
    }
  })
  .catch(err => {
    if (err.response.status === 400) {
      dispatch(createMessage({ userUpdateDataError: 'Taki użytkownik już istnieje lub dane zostały wprowadzone nieprawidłowo' }))
    } else if (err.response.status === 401) {
      dispatch({
        type: AUTH_ERROR
      })
    }
  })
}