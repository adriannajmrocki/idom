import axios from 'axios';

import { SEND_TOKEN, GET_FIREBASE_TOKEN, GET_FIREBASE_TOKEN_STATUS, AUTH_ERROR } from './types';
import { baseURL } from '../utils/url';

// SEND FIREBASE TOKEN
// Sends firebase token to the server
export const sendFirebaseToken = data => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': "application/json",
      'Authorization': `Token ${token}`
    }
  }

  axios.post(`${baseURL}/devices/`, data, config)
  .then(res => {
    if (res.status === 201) {
      dispatch({
        type: SEND_TOKEN,
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

// GET FIREBASE TOKEN
export const getFirebaseToken = () => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': "application/json",
      'Authorization': `Token ${token}`
    }
  }

  axios.get(`${baseURL}/devices/`, config)
  .then(res => {
    dispatch({
      type: GET_FIREBASE_TOKEN,
      payload: res.data
    })
    dispatch({
      type: GET_FIREBASE_TOKEN_STATUS,
      payload: res.status
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