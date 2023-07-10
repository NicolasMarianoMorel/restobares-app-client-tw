import { ActionTypes } from "../constants";
import axios from "axios";

export function callStaff(idResto, idTable) {

  return async function(dispatch) {
    
    try {
      await axios.put(`https://dingbell.onrender.com/resto/${idResto}/table/${idTable}/order`);

      return dispatch({
        type: ActionTypes.PUT_CALL_STAFF,
        payload: idTable
      });
    } catch(err) {
      console.log(err);
    }
  }
}
