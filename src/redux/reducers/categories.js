import { ActionTypes } from "../constants";

const initialState = []
function categories(state = initialState, action) {

  if (action.type === ActionTypes.GET_CATEGORIES) {
    return [...action.payload];
  }
  return state;
}

export default categories;