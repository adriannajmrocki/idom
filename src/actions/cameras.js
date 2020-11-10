import axios from 'axios';

import { GET_CAMERAS, ADD_CAMERA } from './types';
import { baseURL } from '../utils/url';
import { createMessage } from './messages';

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


// ADD CAMERA
// Add one item with camera name to the list
export const addCamera = camera => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': "application/json",
      'Authorization': `Token ${token}`
    }
  }

  axios.post(`${baseURL}/cameras/add`, camera, config)
  .then(res => {
    console.log(res)
    if (res.status === 201) {
      dispatch(createMessage({ cameraAdded: 'Kamera została dodana' }))
      dispatch({
        type: ADD_CAMERA,
        payload: res.data
      })
    }
  })
  .catch(err => {
    if (err.response.status === 400) {
      dispatch(createMessage({ cameraExists: 'Kamera o podanej nazwie już istnieje' }))
    }
  })
}