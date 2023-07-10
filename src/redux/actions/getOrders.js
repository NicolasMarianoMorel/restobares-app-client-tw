import { ActionTypes } from "../constants";
import axios from "axios";

export function getOrders(idResto, idTable) {

  return async function(dispatch) {
    
    var json = await axios.get(`https://dingbell.onrender.com/resto/${idResto}/table/${idTable}/order`);

    return dispatch({
      type: ActionTypes.GET_ORDERS,
      payload: json.data
    })
  }
}