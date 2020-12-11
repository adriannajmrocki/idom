import axios from 'axios';

import { GET_ACTIONS, ADD_ACTION, DELETE_ACTION } from './types';
import { baseURL } from '../utils/url';
import { createMessage } from './messages';

// GET ACTIONS
// Returns list of actions
export const getActions = () => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  }

  axios.get(`${baseURL}/actions/list`, config)
  .then(res => {
    console.log(res);
    dispatch({
      type: GET_ACTIONS,
      payload: res.data
    })
  })
  .catch(err => console.log(err.response))
}

// ADD ACTION
// Add new action to the list
export const addAction = data => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  }

  axios.post(`${baseURL}/actions/add`, data, config)
  .then(res => {
    if (res.status === 201) {
      dispatch(createMessage({ actionAdded: 'Akcja została dodana' }))
      dispatch({
        type: ADD_ACTION,
        payload: res.data
      })
    }
  })
  .catch(err => {
    if (err.response.status === 400) {
      dispatch(createMessage({ actionExists: 'Akcja o podanej nazwie już istnieje' }))
    }
  })
}

// DELETE ACTION
// Removes item from the list
export const deleteAction = id => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  }

  axios.delete(`${baseURL}/actions/delete/${id}`, config)
  .then(res => {
    dispatch(createMessage({ actionDeleted: 'Akcja została usunięta' }))
    dispatch({
      type: DELETE_ACTION,
      payload: id
    })
  })
  .catch(err => console.log(err.response))
}