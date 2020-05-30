import { GET_SENSORS, DELETE_SENSOR } from '../actions/types';

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
    default:
      return state;
  }
}