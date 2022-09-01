import * as actionTypes from "./actionTypes";
import {API_URL} from "../../res/values/values"

export function loginUserSuccess(res) {
  localStorage.setItem("access_token", res.access_token);
  return { type: actionTypes.Login_User_Success, payload: res.data };
}
export function loginUserError(err) {
  return { type: actionTypes.Login_User_Error, payload: err };
}
export function loginUser(user) {
  return function (dispatch) {
    return loginUserApi(user).then((res) =>{
      
      dispatch(loginUserSuccess(res))
      dispatch(loginUserError(""))
      return true
    }).catch(err=>{
      const error= JSON.parse(err.message)
      dispatch(loginUserError(error.message))
      return false
    });
  };
}
export function loginUserApi(user) {
  let url = `${API_URL}/auth/login`;
  //+(cartItem.id||"")
  return fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function registerUserReturn(res) {
  return res.data;
}
export function registerUser(user) {
  return function (dispatch) {
    return registerUserApi(user).then((res) =>{
      dispatch(registerUserReturn(res))
    }).catch(err=>{
      const error= JSON.parse(err.message)
    });
  };
}
export function registerUserApi(user) {
  let url = `${API_URL}/auth/register`;
  //+(cartItem.id||"")
  return fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function logoutUser() {
  return function (dispatch) {
    return logoutUserApi().then((res) => dispatch(logoutUserSuccess())).catch((err) => dispatch(logoutUserSuccess()));
  };
}
export function logoutUserApi() {
  const access_token = localStorage.getItem("access_token")
  let url = `${API_URL}/auth/logout`;
  //+(cartItem.id||"")
  return fetch(url, {
    method: "GET",
    headers: { 
      "content-type": "application/json" ,
      "Authorization":`Bearer: ${access_token}`
    }
  })
    .then(handleResponse)
    .catch(handleError);
}
export function logoutUserSuccess() {
  localStorage.removeItem("access_token");
  return { type: actionTypes.Login_User_Success, payload: {}};
}
export function getUser() {
  return function (dispatch) {
    return getUserApi().then((res) => dispatch(loginUserSuccess(res))).catch((err) => dispatch(logoutUserSuccess()));
  };
}
export function getUserApi() {
  const access_token = localStorage.getItem("access_token")
  let url = `${API_URL}/auth/getUser`;
  //+(cartItem.id||"")
  return fetch(url, {
    method: "GET",
    headers: { 
      "content-type": "application/json" ,
      "Authorization":`Bearer: ${access_token}`
    }
  })
    .then(handleResponse)
    .catch(handleError);
}
export function changeDeliveryMethod(body,access_token) {
  return function (dispatch) {
    return changeDeliveryMethodApi(body,access_token).then((res) =>{
      dispatch(loginUserSuccess(res))
      dispatch(loginUserError(""))
    }).catch(err=>{
      const error= JSON.parse(err.message)
      dispatch(loginUserError(error.message))
    });
  };
}
export function changeDeliveryMethodApi(body,access_token) {
  let url = `${API_URL}/auth/updateDeliveryMethod`;
  //+(cartItem.id||"")
  return fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer: ${access_token}`,
    },
    body: JSON.stringify(body),
  })
    .then(handleResponse)
    .catch(handleError);
}

export async function handleResponse(response) {
  if (response.ok) return response.json();
  const error = await response.text();
  throw new Error(error);
}
export function handleError(error) {
  throw error;
}
