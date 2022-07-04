import * as actionTypes from "./actionTypes";

export function getAllManufacturer(brands) {
  return { type: actionTypes.Get_All_Manufacturer_Success, payload: brands };
}

export function getManufacturerList() {
  return function (dispatch) {
    let url = "http://localhost:3000/api/manufacturer";
    return fetch(url)
      .then((res) => res.json())
      .then((res) => { dispatch(getAllManufacturer(res.message.data)); });
  };
}
