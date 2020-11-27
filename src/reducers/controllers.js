import { GET_CONTROLLERS, ADD_CONTROLLER, DELETE_CONTROLLER, UPDATE_CONTROLLER, GET_CONTROLLER_DATA, RUN_CONTROLLER } from '../actions/types';

const initialState = {
  controllers: [],
  controllerName: '',
  controllerCategory: '',
  controllerData: ''
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_CONTROLLERS:
      return {
        ...state,
        controllers: action.payload
      }
    case ADD_CONTROLLER:
      return {
        ...state,
        controllers: [...state.controllers, action.payload]
      }
    case DELETE_CONTROLLER:
      return {
        ...state,
        controllers: state.controllers.filter(controller => controller.id !== action.payload)
      }
    case UPDATE_CONTROLLER:
      return {
        ...state,
        controllers: state.controllers.map(controller => (controller.id === action.payload.id ? action.payload : state))
      }
    case GET_CONTROLLER_DATA:
      return {
        ...state,
        controllerName: action.payload.name,
        controllerCategory: action.payload.category,
        controllerData: action.payload.data,
      }
    case RUN_CONTROLLER:
      return {
        ...state,
        controllers: [...state.controllers, action.payload]
      }
    default:
      return state;
  }
}