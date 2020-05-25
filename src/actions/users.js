import { GET_USERS, DELETE_USER } from './types';
import axios from 'axios';

// GET USERS
export const getUsers = () => dispatch => {
  axios.get('http://127.0.0.1:8000/register/')
  .then(res => {
    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  })
  .catch(err => console.log(err));
}

// DELETE USER
export const deleteUser = id => dispatch => {
  axios.delete(`http://127.0.0.1:8000/register/${id}`)
  .then(res => {
    dispatch({
      type: DELETE_USER,
      payload: id
    });
  })
  .catch(err => console.log(err));
}