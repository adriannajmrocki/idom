import { RESET_PASSWORD } from './types';
import axios from 'axios';

// RESET PASSWORD
// Set a new password
export const resetPassword = (password, token) => (dispatch) => {

  // Get token from state
  // const token = getState().auth.token;
  // console.log(token);
  // const token = this.props.match.params.token;
  // console.log(token);

  // Headers
  const config = {
    headers: {
      'Content-Type': "application/json",
      // token
    },
  }

  // If token exists, add to headers config
  // if (token) {
  //   config.headers = token
  // }

  const body = JSON.stringify({ password, token })

  // Post request to API
  axios.post('http://127.0.0.1:8000/password-reset/confirm/', body, config)
  .then(res => {
    console.log(res);
    // dispatch(createMessage({ sensorAdded: 'Czujnik został dodany' }))
     dispatch({
      type: RESET_PASSWORD,
      payload: res.data
    })
  })
  .catch(err => {
    console.log(err.response);
    // if (err.response.status === 400 || err.response.status === 409) {
    //   dispatch(returnErrors(err.response.data, err.response.status))
    // }
  })
}