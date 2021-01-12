import { GET_SENSORS, DELETE_SENSOR, ADD_SENSOR, UPDATE_SENSOR, GET_SENSOR_DATA, GET_CHART_DATA, POST_CSV_STATUS, POST_CSV_DATA } from '../actions/types';

const initialState = {
  sensors: [],
  chartData: [],
  sensorName: '',
  sensorCategory: '',
  sensorFrequency: '',
  csvStatus: null,
  csvData: {}
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
        sensorName: action.payload.name,
        sensorCategory: action.payload.category,
        sensorFrequency: action.payload.frequency
      }
    case DELETE_SENSOR:
      return {
        ...state,
        sensors: state.sensors.filter(sensor => sensor.id !== action.payload),
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
    case GET_CHART_DATA:
      return {
        ...state,
        chartData: action.payload
      }
    case POST_CSV_STATUS:
      return {
        ...state,
        csvStatus: action.payload
      }
    case POST_CSV_DATA:
      return {
        ...state,
        csvData: action.payload
      }
    default:
      return state;
  }
}