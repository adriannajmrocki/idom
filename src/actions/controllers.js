import axios from 'axios';

import { GET_CONTROLLERS, ADD_CONTROLLER, DELETE_CONTROLLER, UPDATE_CONTROLLER, GET_CONTROLLER_DATA, RUN_CONTROLLER, SET_BULB_IP, AUTH_ERROR } from './types';
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
    dispatch({
      type: GET_CONTROLLERS,
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
    } else if (err.response.status === 401) {
      dispatch({
        type: AUTH_ERROR
      })
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
  .catch(err => {
    if (err.response.status === 401) {
      dispatch({
        type: AUTH_ERROR
      })
    }
  })
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
    } else if (err.response.status === 401) {
      dispatch({
        type: AUTH_ERROR
      })
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
  .catch(err => {
    if (err.response.status === 401) {
      dispatch({
        type: AUTH_ERROR
      })
    }
  })
}

// RUN CONTROLLER
// Communicates with backend and run the controller
export const runController = name => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  } 

  axios.post(`${baseURL}/drivers/action`, name, config)
  .then(res => {
    if (res.status === 200) {
      dispatch(createMessage({ controllerRunning: 'Sterownik został uruchomiony' }))
      dispatch({
        type: RUN_CONTROLLER,
        payload: res.data
      })
    }
  })
  .catch(err => {
    if (err.response.status === 404) {
      dispatch(createMessage({ controllerRunError: 'Nie znaleziono sterownika' }))
    } else if (err.response.status === 503) {
      dispatch(createMessage({ controllerOfflineError: 'Sterownik poza siecią' }))
    } else if (err.response.status === 401) {
      dispatch({
        type: AUTH_ERROR
      })
    }
  })
}

// RUN BULB
// Communicates with backend and switch on/off a bulb
export const runBulb = (id, flag) => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  } 

  axios.post(`${baseURL}/bulbs/switch/${id}`, flag, config)
  .then(res => {
    if (res.status === 200) {
      dispatch(createMessage({ controllerRunning: 'Sterownik został uruchomiony' }))
      dispatch({
        type: RUN_CONTROLLER,
        payload: res.data
      })
    }
  })
  .catch(err => {
    if (err.response.status === 401) {
      dispatch({
        type: AUTH_ERROR
      })
    } else {
      dispatch(createMessage({ controllerRunError: 'Nie udało się uruchomić sterownika' }))
    }
  })
}

// SET BULB BRIGHTNESS
// Communicates with backend and set brightness of a bulb
export const postBulbBrightness = (id, data) => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  } 

  axios.post(`${baseURL}/bulbs/brightness/${id}`, data, config)
  .then(res => {
    if (res.status === 200) {
      dispatch(createMessage({ bulbDataSent: 'Dane zostały zaktualizowane' }))
      dispatch({
        type: RUN_CONTROLLER,
        payload: res.data
      })
    }
  })
  .catch(err => {
    if (err.response.status === 401) {
      dispatch({
        type: AUTH_ERROR
      })
    } else {
      dispatch(createMessage({ bulbDataSentError: 'Operacja nie powiodła się' }))
    }
  })
}

// SET BULB COLOR
// Communicates with backend and set a color of a bulb
export const postBulbColor = (id, data) => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  } 

  axios.post(`${baseURL}/bulbs/color/${id}`, data, config)
  .then(res => {
    if (res.status === 200) {
      dispatch(createMessage({ bulbDataSent: 'Dane zostały zaktualizowane' }))
      dispatch({
        type: RUN_CONTROLLER,
        payload: res.data
      })
    }
  })
  .catch(err => {
    if (err.response.status === 401) {
      dispatch({
        type: AUTH_ERROR
      })
    } else {
      dispatch(createMessage({ bulbDataSentError: 'Operacja nie powiodła się' }))
    }
  })
}

// SET BULB IP
// Set IP address for a bulb
export const setBulbIp = (id, data) => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  } 

  axios.put(`${baseURL}/bulbs/ip/${id}`, data, config)
  .then(res => {
    if (res.status === 200) {
      dispatch(createMessage({ ipSet: 'Adres IP został poprawnie dodany' }))
      dispatch({
        type: SET_BULB_IP,
        payload: res.data
      })
    }
  })
  .catch(err => {
    if (err.response.status === 400) {
      dispatch(createMessage({ ipError: 'Podany adres IP jest nieprawidłowy' }))
    } else if (err.response.status === 503) {
      dispatch(createMessage({ ipSet: 'Adres IP został poprawnie dodany' }))
    } else if (err.response.status === 401) {
      dispatch({
        type: AUTH_ERROR
      })
    }
  })
}