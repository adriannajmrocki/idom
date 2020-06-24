import { RESET_PASSWORD } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch(action.type) {
    case RESET_PASSWORD:
      return (state = action.payload);
    default:
      return state;
  }
}