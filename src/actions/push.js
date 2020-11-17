import axios from 'axios';

import { SEND_TOKEN, GET_FIREBASE_TOKEN } from './types';
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
    console.log('body', res.body)
    if (res.status === 201) {
      dispatch({
        type: SEND_TOKEN,
        payload: res.data
      })
    }
  })
  .catch(err => {
    console.log(err);
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
    console.log('get frb token', res);
    if (res.status !== 200) {
      dispatch({
        type: GET_FIREBASE_TOKEN,
        payload: res.data
      })
    }
  })
  .catch(err => console.log(err))
}