import * as actionTypes from "./actionTypes";

export function getAllCartSuccess(cartList) {
  return { type: actionTypes.Get_Cart_List, payload: cartList };
}
export function getCartList() {
  return function (dispatch) {
    return getCartListApi()
      .then((res) => {
        localStorage.setItem("access_token", res.access_token);
        dispatch(getAllCartSuccess(res.message.data));
      })
      .catch((err) => {
        let error = JSON.parse(err.message);
        if (
          error.message === "You are not authorization to access this route"
        ) {
          dispatch(logoutUserSuccess());
          dispatch(getAllCartSuccess([]));
        }
      });
  };
}
export function getCartListApi() {
  const access_token = localStorage.getItem("access_token");
  let url = "http://localhost:3000/api/cart";
  return fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer: ${access_token}`,
    },
  })
    .then(handleResponse)
    .catch(handleError);
}
export function addCart(cartItem) {
  return function (dispatch) {
    return addToCartApi(cartItem)
      .then((res) => {
        localStorage.setItem("access_token", res.access_token);
        dispatch(getAllCartSuccess(res.message.data));
      })
      .catch((err) => {
        let error = JSON.parse(err.message);
        if (
          error.message === "You are not authorization to access this route"
        ) {
          dispatch(logoutUserSuccess());
          dispatch(getAllCartSuccess([]));
        }
      });
  };
}
export function addToCartApi(cartItem) {
  const access_token = localStorage.getItem("access_token");
  let url = "http://localhost:3000/api/cart/add";
  return fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer: ${access_token}`,
    },
    body: JSON.stringify(cartItem),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function updateCartDeliveryMethod(deliverymethod) {
  return function (dispatch) {
    return updateCartDeliveryMethodApi(deliverymethod)
      .then((res) => {
        localStorage.setItem("access_token", res.access_token);
        dispatch(getAllCartSuccess(res.message.data));
      })
      .catch((err) => {
        let error = JSON.parse(err.message);
        if (
          error.message === "You are not authorization to access this route"
        ) {
          dispatch(logoutUserSuccess());
          dispatch(getAllCartSuccess([]));
        }
      });
  };
}
export function updateCartDeliveryMethodApi(deliverymethod) {
  const body ={deliverymethod:deliverymethod}
  const access_token = localStorage.getItem("access_token");
  let url = "http://localhost:3000/api/cart/changeDeliveryMethod";
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

//#region Item Remove From Cart
export function removeFromCart(id) {
  return function (dispatch) {
    return removeFromCartApi(id)
      .then((res) => {
        localStorage.setItem("access_token", res.access_token);
        dispatch(getAllCartSuccess(res.message.data));
      })
      .catch((err) => {
        let error = JSON.parse(err.message);
        if (
          error.message === "You are not authorization to access this route"
        ) {
          dispatch(logoutUserSuccess());
          dispatch(getAllCartSuccess([]));
        }
      });
  };
}
export function removeFromCartApi(id) {
  const access_token = localStorage.getItem("access_token");
  let url = `http://localhost:3000/api/cart/${id}/delete`;
  return fetch(url, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer: ${access_token}`,
    }
  })
    .then(handleResponse)
    .catch(handleError);
}
//#endregion
//#region Update Cart Item
export function updateCartItem(body) {
  //debugger
  return function (dispatch) {
    return updateCartItemApi(body)
      .then((res) => {
        localStorage.setItem("access_token", res.access_token);
        dispatch(getAllCartSuccess(res.message.data));
      })
      .catch((err) => {
        let error = JSON.parse(err.message);
        if (
          error.message === "You are not authorization to access this route"
        ) {
          dispatch(logoutUserSuccess());
          dispatch(getAllCartSuccess([]));
        }
      });
  };
}
export function updateCartItemApi(body) {
  const access_token = localStorage.getItem("access_token");
  let url = "http://localhost:3000/api/cart/update";
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
//#endregion

//#region Global functions
export async function handleResponse(response) {
  if (response.ok) return response.json();

  const error = await response.text();
  throw new Error(error);
}
export function handleError(error) {
  throw error;
}
export function logoutUserSuccess() {
  localStorage.removeItem("access_token");
  return { type: actionTypes.Login_User_Success, payload: {} };
}
//#endregion
