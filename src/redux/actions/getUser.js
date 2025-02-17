import { ActionTypes } from "../constants";
import axios from "axios";

export function getUser(idResto) {

  return async function(dispatch) {

    var json = await axios.get(`https://dingbell.onrender.com/resto/${idResto}/user`);

      return dispatch({
        type: ActionTypes.GET_USER,
        payload: json.data
      });
  }
}

