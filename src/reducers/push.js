import { SEND_TOKEN, GET_FIREBASE_TOKEN } from '../actions/types';

const initialState = {
  isFirebaseTokenSent: false,
  firebaseToken: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SEND_TOKEN:
      return {
        ...state,
        isFirebaseTokenSent: true
      }
    case GET_FIREBASE_TOKEN:
      return {
        ...state,
        firebaseToken: action.payload.registration_id
      }
    default:
      return state;
  }
}