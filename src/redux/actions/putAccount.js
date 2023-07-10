import { ActionTypes } from "../constants";
import axios from "axios";

//usar este controller para todas las demas*

export function putAccount(idResto, body, token) {

  return async function(dispatch) {

    try {

      var json = await axios.put(`https://dingbell.onrender.com/resto/${idResto}/admin/account`, body, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return dispatch({
        type: ActionTypes.PUT_ACCOUNT,
        payload: json.data
      })
    } catch(err) {
      console.log(err);
    }
  }
}