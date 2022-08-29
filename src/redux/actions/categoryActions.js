import * as actionTypes from './actionTypes'
import {API_URL} from "../../res/values/values"

export function getAllCategoriesSuccess(categories){
    return{type:actionTypes.Get_All_Categories_Success,payload:categories}
}

export function getCategories(){
    return function(dispatch){
    let url=`${API_URL}/categories`
    return fetch(url).then(res=>res.json()).then(res=>dispatch(getAllCategoriesSuccess(res.message.data)))
   }
}