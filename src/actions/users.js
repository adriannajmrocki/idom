import { GET_USERS, DELETE_USER, UPDATE_USER, GET_USER_DATA } from './types';
import axios from 'axios';
import { createMessage, returnErrors } from './messages';

// GET USERS
export const getUsers = () => (dispatch, getState) => {
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

  axios.get('api/users/list', config)
  .then(res => {
    console.log(res);
    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  })
  .catch(err => console.log(err));
}


// // GET USER DATA
// export const getUserData = (userData) => dispatch => {
//   axios.get(`http://127.0.0.1:8000/users/list`)
//   .then(res => {
//     console.log(res);
//     dispatch({
//       type: GET_USER_DATA,
//       payload: res.data
//     });
//   })
//   .catch(err => console.log(err));
// }

// GET USER DATA
// Return data of user
export const getUserData = (id) => (dispatch, getState) => {

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

  axios.get(`api/users/detail_id/${id}`, config)
  .then(res => {
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: GET_USER_DATA,
        payload: res.data
      })
    }
  })
  .catch(err => console.log(err))
}


// DELETE USER
export const deleteUser = id => (dispatch, getState) => {

  // Get token from state
  const token = getState().auth.token;
  console.log(token);

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  axios.delete(`api/users/delete/${id}`, config)
  .then(res => {
    console.log(res);
    dispatch(createMessage({ userDeleted: 'Użytkownik został usunięty' }))
    dispatch({
      type: DELETE_USER,
      payload: id
    });
  })
  .catch(err => console.log(err));
}


// UPDATE USER
// Update user's data
export const updateUser = (id, userData) => (dispatch, getState) => {

  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // If token exists, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`
  }

  // Put request to API
  axios.put(`api/users/update/${id}`, userData, config)
  .then(res => {
    console.log(res);
    if (res.status === 200) {
      dispatch(createMessage({ userUpdated: 'Dane użytkownika zostały zmodyfikowane' }))
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      })
    }
  })
  .catch(err => {
    console.log(err.response);
    if (err.response.status === 400) {
      dispatch(createMessage({ userUpdateDataError: 'Taki użytkownik już istnieje lub dane zostały wprowadzone nieprawidłowo' }))
    }
  })
}