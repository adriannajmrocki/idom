import axios from 'axios';

import { GET_ACTIONS, ADD_ACTION, DELETE_ACTION, GET_ACTION_DATA, UPDATE_ACTION, AUTH_ERROR } from './types';
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
    dispatch({
      type: GET_ACTIONS,
      payload: res.data
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
    } else if (err.response.status === 404) {
      dispatch(createMessage({ emptyFieldsError: 'Nie wszystkie wymagane pola zostały wypełnione' }))
    } else if (err.response.status === 401) {
      dispatch({
        type: AUTH_ERROR
      })
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
  .catch(err => {
    if (err.response.status === 401) {
      dispatch({
        type: AUTH_ERROR
      })
    }
  })
}

// GET ACTION DATA
// Return data of action
export const getActionData = (id) => (dispatch, getState) => {

  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  }

  axios.get(`${baseURL}/actions/detail/${id}`, config)
  .then(res => {
    if (res.status === 200) {
      dispatch({
        type: GET_ACTION_DATA,
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

// UPDATE ACTION
// Update action's data
export const updateAction = (id, data) => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  } 

  if (token) {
    config.headers['Authorization'] = `Token ${token}`
  }

  axios.put(`${baseURL}/actions/update/${id}`, data, config)
  .then(res => {
    if (res.status === 200) {
      dispatch(createMessage({ actionUpdated: 'Akcja została zmodyfikowana' }))
      dispatch({
        type: UPDATE_ACTION,
        payload: res.data
      })
    }
  })
  .catch(err => {
    if (err.response.status === 400) {
      dispatch(createMessage({ invalidData: 'Wprowadzone dane są nieprawidłowe' }))
    } else if (err.response.status === 404) {
      dispatch(createMessage({ actionExistsError: 'Akcja nie istnieje' }))
    } else if (err.response.status === 401) {
      dispatch({
        type: AUTH_ERROR
      })
    }
  })
}