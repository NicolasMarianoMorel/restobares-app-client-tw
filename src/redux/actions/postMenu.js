import { ActionTypes } from "../constants";
import axios from "axios";

export function postMenu(idResto, menuItem, token) {

  return async function(dispatch) {

    try {
      var json = await axios.post(`https://dingbell.onrender.com/resto/${idResto}/admin/menu`, menuItem, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return dispatch({
        type: ActionTypes.POST_MENU,
        payload: json.data
      })
    } catch(err) {
      console.log(err);
    }
  }
}