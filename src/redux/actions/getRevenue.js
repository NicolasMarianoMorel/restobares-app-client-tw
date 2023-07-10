import { ActionTypes } from "../constants";
import axios from "axios";

export function getRevenue(idResto, params, token) {

  return async function(dispatch) {

    // asegurate que params tenga al menos una de estas 2 props [filterTime, orderPrice]
    try {

      if(params === 'Daily') {
        var json = await axios.get(`https://dingbell.onrender.com/resto/${idResto}/admin/revenue`, {
          params: {
            filterTime: 'Day'
          },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        return dispatch({
          type: ActionTypes.GET_DAILY_REVENUE,
          payload: json.data
        });
      }
      if(params === 'Monthly') {
        json = await axios.get(`https://dingbell.onrender.com/resto/${idResto}/admin/revenue`, {
          params: {
            filterTime: 'Month'
          },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        return dispatch({
          type: ActionTypes.GET_MONTHLY_REVENUE,
          payload: json.data
        });
      }
      if(params === 'Weekly') {
        json = await axios.get(`https://dingbell.onrender.com/resto/${idResto}/admin/revenue`, {
          params: {
            filterTime: 'Last7days'
          },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        return dispatch({
          type: ActionTypes.GET_WEEKLY_REVENUE,
          payload: json.data
        });
      }
       json = await axios.get(`https://dingbell.onrender.com/resto/${idResto}/admin/revenue`, {
        params,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return dispatch({
        type: ActionTypes.GET_REVENUE,
        payload: json.data
      })
    } catch(err) {
      console.log(err);
    }
  }
} 
