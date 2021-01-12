import { ADD_ACTION, GET_ACTIONS, DELETE_ACTION, GET_ACTION_DATA, UPDATE_ACTION } from '../actions/types';

const initialState = {
  interactions: [],
  name: '',
  sensor: '', 
  trigger: '',
  operator: '',
  controller: '',
  days: '',
  isActive: '',
  startEvent: '',
  endEvent: '',
  flag: '',
  type: '',
  status: '',
  brightness: '',
  red: '',
  green: '',
  blue: ''
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ACTIONS:
      return {
        ...state,
        interactions: action.payload
      }
    case ADD_ACTION:
      return {
        ...state,
        interactions: [...state.interactions, action.payload]
      }
    case DELETE_ACTION:
      return {
        ...state,
        interactions: state.interactions.filter(interaction => interaction.id !== action.payload)
      }
    case GET_ACTION_DATA:
      return {
        ...state,
        name: action.payload.name,
        sensor: action.payload.sensor,
        trigger: action.payload.trigger,
        operator: action.payload.operator,
        controller: action.payload.driver,
        days: action.payload.days,
        isActive: action.payload.is_active,
        startEvent: action.payload.start_event,
        endEvent: action.payload.end_event,
        flag: action.payload.flag,
        type: action.payload.action.type,
        status: action.payload.action.status,
        brightness: action.payload.action.brightness,
        red: action.payload.action.red,
        green: action.payload.action.green,
        blue: action.payload.action.blue,
      }
    case UPDATE_ACTION:
      return {
        ...state,
        interactions: state.interactions.map(interaction => (interaction.id === action.payload.id ? action.payload : state))
      }
    default:
      return state;
  }
}
