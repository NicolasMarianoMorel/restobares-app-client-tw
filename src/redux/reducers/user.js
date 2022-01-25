import { ActionTypes } from "../constants";

const initialState = {};

function user(state = initialState, action) {

  if (action.type === ActionTypes.GET_USER) {
    return action.payload[0]
  }
  return state;
}

export default user;