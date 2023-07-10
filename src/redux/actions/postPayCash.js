import { ActionTypes } from "../constants";
import axios from "axios";

export function postPayCash(idResto, idTable, tip) {

  return async function(dispatch) {

    try {

      var json = await axios.post(`https://dingbell.onrender.com/resto/${idResto}/table/${idTable}/payment`, {
        state: "pay_cash",
        tip
      });

      return dispatch({
        type: ActionTypes.POST_PAY_CASH,
        payload: json.data
      })
    } catch(err) {
      console.log(err);
    }
  }
}