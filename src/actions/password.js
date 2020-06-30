import { RESET_PASSWORD } from './types';
import axios from 'axios';
import { createMessage } from './messages';

// RESET PASSWORD
// Set a new password
export const resetPassword = (payload) => (dispatch) => {

  // Headers
  const config = {
    headers: {
      'Content-Type': "application/json",
    },
  }

  const host = 'https://tauriform-wren-7690.dataplicity.io/';
  axios.defaults.baseURL = host;
  axios.defaults.port = 8001;
 
  const body = JSON.stringify(payload)

  // Post request to API
  axios.post('api/password-reset/confirm/', body, config)
  .then(res => {
    console.log(res);
    if (res.status === 200) {
      dispatch(createMessage({ resetPasswordSuccess: 'Hasło zostało zmienione' }))
       dispatch({
        type: RESET_PASSWORD,
        payload: res.data
      })
    }
  })
  .catch(err => {
    console.log(err.response);
    if (err.response.status === 400) {
      dispatch(createMessage({ resetPasswordError: 'Hasło nie zawiera od 8 do 25 znaków lub jest zbyt łatwe' }))
    }
  })
}