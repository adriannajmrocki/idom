import { GET_CAMERAS } from '../actions/types';

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
    default:
      return state;
  }
}