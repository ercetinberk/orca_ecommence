import * as actionTypes from "./actionTypes";
import {API_URL} from "../../res/values/values"

export function getAllManufacturer(brands) {
  return { type: actionTypes.Get_All_Manufacturer_Success, payload: brands };
}

export function getManufacturerList() {
  return function (dispatch) {
    let url = `${API_URL}/manufacturer`;
    return fetch(url)
      .then((res) => res.json())
      .then((res) => { dispatch(getAllManufacturer(res.message.data)); });
  };
}
