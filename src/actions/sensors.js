import { GET_SENSORS } from './types';
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