import { ActionTypes } from "../constants";
import axios from "axios";

export function getFeedback(idResto, token) {

  return async function(dispatch) {

    try {
      var json = await axios.get(`https://dingbell.onrender.com/resto/${idResto}/admin/feedback`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return dispatch({
        type: ActionTypes.GET_FEEDBACK,
        payload: json.data
      })
    } catch(err) {
      console.log(err);
    }
  }
} 