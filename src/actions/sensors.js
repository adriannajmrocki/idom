import axios from 'axios';

import { GET_SENSORS, DELETE_SENSOR, ADD_SENSOR, UPDATE_SENSOR, GET_SENSOR_DATA, GET_CHART_DATA, POST_CSV } from './types';
import { createMessage } from './messages';
import { baseURL } from '../utils/url';

// GET SENSORS
// Return list of active sensors
export const getSensors = () => (dispatch, getState) => {

  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  }

  axios.get(`${baseURL}/sensors/list`, config)
  .then(res => {
    dispatch({
      type: GET_SENSORS,
      payload: res.data
    })
  })
  .catch(err => console.log(err))
}


// GET SENSOR DATA
// Return data of sensor
export const getSensorData = (id) => (dispatch, getState) => {

  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  }

  axios.get(`${baseURL}/sensors/detail/${id}`, config)
  .then(res => {
    if (res.status === 200) {
      dispatch({
        type: GET_SENSOR_DATA,
        payload: res.data
      })
    }
  })
  .catch(err => console.log(err))
}


// DELETE SENSOR
// Delete sensor and update the view after delete button click
export const deleteSensor = id => (dispatch, getState) => {

  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  // Delete request to API
  axios.delete(`${baseURL}/sensors/delete/${id}`, config)
  .then(res => {
    dispatch(createMessage({ sensorDeleted: 'Czujnik został usunięty' }))
    dispatch({
      type: DELETE_SENSOR,
      payload: id
    })
  })
  .catch(err => console.log(err.response))
}


// ADD SENSOR
// Add a new sensor to the list
export const addSensor = sensor => (dispatch, getState) => {

  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': "application/json"
    }
  }

  // If token exists, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`
  }

  // Post request to API
  axios.post(`${baseURL}/sensors/add`, sensor, config)
  .then(res => {
    if (res.status === 201) {
      dispatch(createMessage({ sensorAdded: 'Czujnik został dodany' }))
      dispatch({
        type: ADD_SENSOR,
        payload: res.data
      })
    }
  })
  .catch(err => {
    if (err.response.status === 400) {
      dispatch(createMessage({ sensorExists: 'Czujnik o podanej nazwie już istnieje' }))
    }
  })
}


// UPDATE SENSOR
// Update sensor's data
export const updateSensor = (id, sensor) => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  } 

  if (token) {
    config.headers['Authorization'] = `Token ${token}`
  }

  axios.put(`${baseURL}/sensors/update/${id}`, sensor, config)
  .then(res => {
    if (res.status === 200) {
      dispatch(createMessage({ sensorUpdated: 'Czujnik został zmodyfikowany' }))
      dispatch({
        type: UPDATE_SENSOR,
        payload: res.data
      })
    }
  })
  .catch(err => {
    if (err.response.status === 400 || err.response.status === 404) {
      dispatch(createMessage({ sensorExists: 'Taki czujnik już istnieje' }))
    }
  })
}

// GET CHART DATA
// Returns data from sensor which will use to create a chart
export const getChartData = id => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  } 

  axios.get(`${baseURL}/sensors_data/list/${id}`, config)
  .then(res => {
    dispatch({
      type: GET_CHART_DATA,
      payload: res.data
    })
  })
  .catch(err => console.log(err))
}

// POST CSV
// Send a post request for .csv file
export const postCsv = sensorData => (dispatch, getState) => {

  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': "application/json"
    }
  }

  // If token exists, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`
  }

  // Post request to API
  axios.post(`${baseURL}/sensors_data/csv`, sensorData, config)
  .then(res => {
    console.log(res);
    if (res.status === 200) {
      dispatch(createMessage({ csvAccepted: 'Plik został wygenerowany' }))
      dispatch({
        type: POST_CSV,
        payload: res.data
      })
    }
  })
  .catch(err => {
    console.log(err.response);
  })
}