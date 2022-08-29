import * as actionTypes from "./actionTypes";
import {API_URL} from "../../res/values/values"

export function getAllSettingsSuccess(settings) {
  return { type: actionTypes.Get_All_Settings_Success, payload: settings };
}

export function getSettings() {
  return function (dispatch) {
    let url = `${API_URL}/settings`;
    return fetch(url)
      .then((res) => res.json())
      .then((res) => {
        dispatch(getAllSettingsSuccess(res.message.data));
      });
  };
}
