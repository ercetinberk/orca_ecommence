import * as actionTypes from "./actionTypes";

export function getAllSettingsSuccess(settings) {
  return { type: actionTypes.Get_All_Settings_Success, payload: settings };
}

export function getSettings() {
  return function (dispatch) {
    let url = "https://orca-ecommerce-api.herokuapp.com/api/settings";
    return fetch(url)
      .then((res) => res.json())
      .then((res) => {
        dispatch(getAllSettingsSuccess(res.message.data));
      });
  };
}
