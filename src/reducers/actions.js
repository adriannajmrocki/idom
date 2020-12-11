import { ADD_ACTION, GET_ACTIONS, DELETE_ACTION } from '../actions/types';

const initialState = {
  interactions: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ACTIONS:
      return {
        ...state,
        interactions: action.payload
      }
    case ADD_ACTION:
      return {
        ...state,
        interactions: [...state.interactions, action.payload]
      }
    case DELETE_ACTION:
      return {
        ...state,
        interactions: state.interactions.filter(interaction => interaction.id !== action.payload)
      }
    default:
      return state;
  }
}
