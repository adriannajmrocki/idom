import { GET_CAMERAS, ADD_CAMERA, DELETE_CAMERA, UPDATE_CAMERA, GET_CAMERA_DATA } from '../actions/types';

const initialState = {
  cameras: [],
  cameraName: ''
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_CAMERAS:
      return {
        ...state,
        cameras: action.payload
      }
    case ADD_CAMERA:
      return {
        ...state,
        cameras: [...state.cameras, action.payload]
      }
    case DELETE_CAMERA:
      return {
        ...state,
        cameras: state.cameras.filter(camera => camera.id !== action.payload)
      }
    case UPDATE_CAMERA:
      return {
        ...state,
        cameras: state.cameras.map(camera => (camera.id === action.payload.id ? action.payload : state))
      }
    case GET_CAMERA_DATA:
      return {
        ...state,
        cameraName: action.payload.name,
      }
    default:
      return state;
  }
}