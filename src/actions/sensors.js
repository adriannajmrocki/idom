import { GET_SENSORS, DELETE_SENSOR } from './types';
import axios from 'axios';

// GET SENSORS
// Return list of active sensors
export const getSensors = () => (dispatch, getState) => {

  // Get token from state
  const token = getState().auth.token;
  console.log(token);

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  }

  axios.get('http://127.0.0.1:8000/sensors/list', config)
  .then(res => {
    console.log(res);
    dispatch({
      type: GET_SENSORS,
      payload: res.data
    })
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
  axios.delete(`http://127.0.0.1:8000/sensors/delete/${id}`, config)
  .then(res => {
    console.log(res);
    dispatch({
      type: DELETE_SENSOR,
      payload: id
    })
  })
  .catch(err => console.log(err.response))
}