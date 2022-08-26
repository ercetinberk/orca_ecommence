/* eslint-disable no-use-before-define */
import * as actionTypes from "./actionTypes";

export function getAllProductsSuccess(products) {
  return { type: actionTypes.Get_All_Products_Success, payload: products };
}
export function clearProductsSuccess(products) {
  return { type: actionTypes.Get_All_Products_Success, payload: [] };
}
export function getProductsSuccessDataCount(dataCount) {
  return {
    type: actionTypes.Get_Products_Success_DataCount,
    payload: dataCount,
  };
}
export function getProducts(catId, productid,filter, page, rowsPerPage,user,brand,country) {
  return function (dispatch) {
    let url = "https://orca-ecommerce-api.herokuapp.com/api/products";
  
      url+=`?search=orca${catId ? `&itemcategory=${catId}` : ''}`+
      `${productid ? `&productgroup=${productid}` : ''}`+
      `${filter ? `&filter=${filter}` : ''}`+
      `&page=${page}`+
      `&rowsPerPage=${rowsPerPage}`+
      `&customerprice=${user.customerpricegroup}`+
      `${brand ? `&brand=${brand}` : ''}`+
      `${country ? `&country=${country}` : ''}`
    
    return fetch(url)
      .then((res) => res.json())
      .then((res) => {
        dispatch(getAllProductsSuccess(res.message.data));
        dispatch(getProductsSuccessDataCount(res.message.dataCount));
      });
  };
}
export function getFilterProducts(catId, productid,filter, page, rowsPerPage,user,brand,country) {
  return function (dispatch) {
    let url = "https://orca-ecommerce-api.herokuapp.com/api/products";
    if (filter)
      url += `?filter=${filter}&page=${page}&rowsPerPage=${rowsPerPage}&customerprice=${user.customerpricegroup}`;
    else url += `?page=${page}&rowsPerPage=${rowsPerPage}&customerprice=${user.customerpricegroup}`;
    if(brand) url += `&brand=${brand}`;
    if(country) url += `&country=${country}`;
    console.log(url);
    return fetch(url)
      .then((res) => res.json())
      .then((res) => {
        dispatch(getAllProductsSuccess(res.message.data))
        dispatch(getProductsSuccessDataCount(res.message.dataCount));
      });
  };
}
export function getAllSearchProductsSuccess(products) {
  return {
    type: actionTypes.Get_All_Search_Products_Success,
    payload: products,
  };
}

export function getSearchProducts() {
  return function (dispatch) {
    let url = "https://orca-ecommerce-api.herokuapp.com/api/products";
    return fetch(url)
      .then((res) => res.json())
      .then((res) => dispatch(getAllSearchProductsSuccess(res.message.data)));
  };
}
export function getProductSearchValues(catId, productid) {
  return function (dispatch) {
    let url = "http://192.168.1.39:3000/api/searchvalues";
    return fetch(url)
      .then((res) => res.json())
      .then((res) => dispatch(getAllProductsSuccess(res.message.data)));
  };
}
export function getAllProductsSearchValuesSuccess(products) {
  return { type: actionTypes.Get_All_Products_Success, payload: products };
}
export function changeSearch(search) {
  return { type: actionTypes.Change_Saerch, payload: search };
}
