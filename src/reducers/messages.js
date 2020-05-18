import { CREATE_MESSAGE } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch(action.types) {
    case CREATE_MESSAGE:
      return (state = action.payload);
    default:
      return state;
  }
}