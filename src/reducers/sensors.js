import { GET_SENSORS, DELETE_SENSOR, ADD_SENSOR, UPDATE_SENSOR, GET_SENSOR_DATA } from '../actions/types';

const initialState = {
  sensors: [],
  sensorName: '',
  sensorCategory: '',
  sensorFrequency: ''
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_SENSORS:
      return {
        ...state,
        sensors: action.payload,
      }
    case GET_SENSOR_DATA:
      return {
        ...state,
        // sensors: action.payload
        // sensors: state.sensors.map(sensor => (sensor.id === action.payload.id ? action.payload : state)),
        sensorName: action.payload.name,
        sensorCategory: action.payload.category,
        sensorFrequency: action.payload.frequency
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