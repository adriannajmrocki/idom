import axios from 'axios';

import { GET_CONTROLLERS, ADD_CONTROLLER, DELETE_CONTROLLER, UPDATE_CONTROLLER, GET_CONTROLLER_DATA } from './types';
import { createMessage } from './messages';
import { baseURL } from '../utils/url';

// GET CONTROLLERS
// Return list of controllers
export const getControllers = () => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  }

  axios.get(`${baseURL}/drivers/list`, config)
  .then(res => {
    console.log(res);
    dispatch({
      type: GET_CONTROLLERS,
      payload: res.data
    })
  })
  .catch(err => console.log(err))
}

// ADD CONTROLLER
// Adds new item with controller to the list
export const addController = controller => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': "application/json",
      'Authorization': `Token ${token}`
    }
  }

  axios.post(`${baseURL}/drivers/add`, controller, config)
  .then(res => {
    console.log(res)
    if (res.status === 201) {
      dispatch(createMessage({ controllerAdded: 'Sterownik został dodany' }))
      dispatch({
        type: ADD_CONTROLLER,
        payload: res.data
      })
    }
  })
  .catch(err => {
    if (err.response.status === 400) {
      dispatch(createMessage({ controllerExists: 'Sterownik o podanej nazwie już istnieje' }))
    }
  })
}

// DELETE CONTROLLER
// Removes item from the list
export const deleteController = id => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  }

  axios.delete(`${baseURL}/drivers/delete/${id}`, config)
  .then(res => {
    dispatch(createMessage({ controllerDeleted: 'Sterownik został usunięty' }))
    dispatch({
      type: DELETE_CONTROLLER,
      payload: id
    })
  })
  .catch(err => console.log(err.response))
}

// UPDATE CONTROLLER
// Updates controller's data
export const updateController = (id, controller) => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  } 

  axios.put(`${baseURL}/drivers/update/${id}`, controller, config)
  .then(res => {
    if (res.status === 200) {
      dispatch(createMessage({ controllerUpdated: 'Sterownik został zmodyfikowany' }))
      dispatch({
        type: UPDATE_CONTROLLER,
        payload: res.data
      })
    }
  })
  .catch(err => {
    if (err.response.status === 400 || err.response.status === 404) {
      dispatch(createMessage({ controllerExists: 'Sterownik o podanej nazwie już istnieje' }))
    }
  })
}

// GET CONTROLLER DATA
// Returns single controller's data
export const getControllerData = (id) => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  }

  axios.get(`${baseURL}/drivers/detail/${id}`, config)
  .then(res => {
    if (res.status === 200) {
      dispatch({
        type: GET_CONTROLLER_DATA,
        payload: res.data
      })
    }
  })
  .catch(err => console.log(err))
}