import axios from 'axios';

import { GET_CAMERAS, ADD_CAMERA, DELETE_CAMERA, UPDATE_CAMERA, GET_CAMERA_DATA } from './types';
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
// Adds new item with camera name to the list
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

// DELETE CAMERA
// Removes item from the list
export const deleteCamera = id => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  }

  axios.delete(`${baseURL}/cameras/delete/${id}`, config)
  .then(res => {
    dispatch(createMessage({ cameraDeleted: 'Kamera została usunięta' }))
    dispatch({
      type: DELETE_CAMERA,
      payload: id
    })
  })
  .catch(err => console.log(err.response))
}

// UPDATE CAMERA
// Updates camera's data
export const updateCamera = (id, camera) => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  } 

  axios.put(`${baseURL}/cameras/update/${id}`, camera, config)
  .then(res => {
    if (res.status === 200) {
      dispatch(createMessage({ cameraUpdated: 'Kamera została zmodyfikowana' }))
      dispatch({
        type: UPDATE_CAMERA,
        payload: res.data
      })
    }
  })
  .catch(err => {
    if (err.response.status === 400 || err.response.status === 404) {
      dispatch(createMessage({ cameraExists: 'Kamera o podanej nazwie już istnieje' }))
    }
  })
}

// GET CAMERA DATA
// Returns single camera's data
export const getCameraData = (id) => (dispatch, getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  }

  axios.get(`${baseURL}/cameras/detail/${id}`, config)
  .then(res => {
    if (res.status === 200) {
      dispatch({
        type: GET_CAMERA_DATA,
        payload: res.data
      })
    }
  })
  .catch(err => console.log(err))
}