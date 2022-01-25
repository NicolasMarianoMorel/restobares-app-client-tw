import { ActionTypes } from "../constants";
import axios from "axios";

export function deleteProduct(idResto, idProduct, token) {

  return async function(dispatch) {

    try {

      var json = await axios.delete(`http://restobares-app-api.herokuapp.com/resto/${idResto}/admin/menu/${idProduct}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return dispatch({
        type: ActionTypes.DELETE_PRODUCT,
        payload: json.data
      })
    } catch(err) {
      console.log(err);
    }
  }
}