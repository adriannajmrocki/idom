import { GET_USERS, DELETE_USER, UPDATE_USER, GET_USER_DATA } from '../actions/types';

const initialState = {
  users: [],
  username: '',
  email: '',
  telephone: '',
  language: '',
  appNotifications: '',
  smsNotifications: ''
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      }
    case GET_USER_DATA:
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        telephone: action.payload.telephone,
        language: action.payload.language,
        appNotifications: '' + action.payload.app_notifications,
        smsNotifications: '' + action.payload.sms_notifications
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