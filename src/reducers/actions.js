import { ADD_ACTION, GET_ACTIONS, DELETE_ACTION, GET_ACTION_DATA } from '../actions/types';

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
  action: ''
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
        action: action.payload.action,
      }
    default:
      return state;
  }
}
