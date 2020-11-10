import { GET_CAMERAS, ADD_CAMERA } from '../actions/types';

const initialState = {
  cameras: []
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
    default:
      return state;
  }
}