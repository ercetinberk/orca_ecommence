import * as actionTypes from "./actionTypes";

export function getAllCounties(countries) {
  return { type: actionTypes.Get_All_Country_Success, payload: countries };
}

export function getCountryList() {
  return function (dispatch) {
    let url = "https://orca-ecommerce-api.herokuapp.com/api/region";
    return fetch(url)
      .then((res) => res.json())
      .then((res) => { dispatch(getAllCounties(res.message.data)); });
  };
}
