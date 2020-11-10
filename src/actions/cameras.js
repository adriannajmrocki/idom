import axios from 'axios';

import { GET_CAMERAS } from './types';
import { baseURL } from '../utils/url';

// GET CAMERAS
// Returns list of cameras
export const getCameras = () => (dispatch, getState) => {
  
  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  }

  axios.get(`${baseURL}/cameras/list`, config)
  .then(res => {
    console.log(res);
    dispatch({
      type: GET_CAMERAS,
      payload: res.data
    })
  })
  .catch(err => console.log(err))
}