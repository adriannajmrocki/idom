import { GET_USERS, DELETE_USER, UPDATE_USER } from '../actions/types';

const initialState = {
  users: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      }
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      }
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user => (user.id === action.payload.id ? action.payload : state))
      }
    default:
      return state;
  }
}