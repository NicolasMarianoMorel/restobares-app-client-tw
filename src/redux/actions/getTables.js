import { ActionTypes } from "../constants";
import axios from "axios";

export function getTables(idResto, token) {

  return async function(dispatch) {

    try {
      var json = await axios.get(`https://dingbell.onrender.com/resto/${idResto}/staff/tables`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return dispatch({
        type: ActionTypes.GET_TABLES,
        payload: json.data.tables
      })
    } catch(err) {
      console.log(err);
    }
  }
}