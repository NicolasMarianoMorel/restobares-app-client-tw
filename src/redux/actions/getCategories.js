import { ActionTypes } from "../constants";
import axios from "axios";

export function getCategories() {

  return async function(dispatch) {

    var json = await axios.get('https://dingbell.onrender.com/categories');

    return dispatch({
      type: ActionTypes.GET_CATEGORIES,
      payload: json.data
    });
  }
};