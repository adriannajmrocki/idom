import { GET_SENSORS, DELETE_SENSOR, ADD_SENSOR, UPDATE_SENSOR } from '../actions/types';

const initialState = {
  sensors: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_SENSORS:
      return {
        ...state,
        sensors: action.payload
      }
    case DELETE_SENSOR:
      return {
        ...state,
        sensors: state.sensors.filter(sensor => sensor.id !== action.payload)
      }
    case ADD_SENSOR:
      return {
        ...state,
        sensors: [...state.sensors, action.payload]
      }
    case UPDATE_SENSOR:
      return {
        ...state,
        sensors: state.sensors.map(sensor => (sensor.id === action.payload.id ? action.payload : state))
      }
    default:
      return state;
  }
}