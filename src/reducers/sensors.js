import { GET_SENSORS } from '../actions/types';

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
    default:
      return state;
  }
}