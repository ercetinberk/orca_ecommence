import * as actionTypes from './actionTypes'

export function getAllCategoriesSuccess(categories){
    return{type:actionTypes.Get_All_Categories_Success,payload:categories}
}

export function getCategories(){
    return function(dispatch){
    let url="https://orca-ecommerce-api.herokuapp.com/api/categories"
    return fetch(url).then(res=>res.json()).then(res=>dispatch(getAllCategoriesSuccess(res.message.data)))
   }
}