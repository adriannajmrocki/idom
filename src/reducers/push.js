import { SEND_TOKEN, GET_FIREBASE_TOKEN, GET_FIREBASE_TOKEN_STATUS } from '../actions/types';

const initialState = {
  isFirebaseTokenSent: false,
  firebaseToken: '',
  firebaseTokenStatus: null
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
    case GET_FIREBASE_TOKEN_STATUS:
      return {
        ...state,
        firebaseTokenStatus: action.payload
      }
    default:
      return state;
  }
}