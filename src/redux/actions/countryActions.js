import * as actionTypes from "./actionTypes";
import {API_URL} from "../../res/values/values"

export function getAllCounties(countries) {
  return { type: actionTypes.Get_All_Country_Success, payload: countries };
}

export function getCountryList() {
  return function (dispatch) {
    let url = `${API_URL}/region`;
    return fetch(url)
      .then((res) => res.json())
      .then((res) => { dispatch(getAllCounties(res.message.data)); });
  };
}
