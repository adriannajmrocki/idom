import { GET_USERS, DELETE_USER } from './types';
import axios from 'axios';

// GET USERS
export const getUsers = () => dispatch => {
  axios.get('http://127.0.0.1:8000/users/list')
  .then(res => {
    console.log(res);
    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  })
  .catch(err => console.log(err));
}

// DELETE USER
export const deleteUser = id => (dispatch, getState) => {

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

  // If token, add to headers config
  // if (token) {
  //   config.headers['Authorization'] = `Token ${token}`;
  // }

  axios.delete(`http://127.0.0.1:8000/users/delete/${id}`, config)
  .then(res => {
    console.log(res);
    dispatch({
      type: DELETE_USER,
      payload: id
    });
  })
  .catch(err => console.log(err));
}