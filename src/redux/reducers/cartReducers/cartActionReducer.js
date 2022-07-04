import * as actionTypes from "../../actions/actionTypes";
import initialState from "../initialState";

export default function cartActionReducer(state = initialState.cart,action){
    switch(action.type){
        case actionTypes.Add_To_Cart :
            let addedItem = state.find((cartItem)=>cartItem.itemno===action.payload.product.itemno) 
            if(addedItem){
                let newState = state.map(c=>{
                    if(c.itemno === action.payload.product.itemno){
                        return Object.assign({},addedItem,{quantity:addedItem.quantity+1,lineamount:(addedItem.unitprice*(addedItem.quantity+1))})
                    }
                    return c
                })
                return newState
            }else{
                let newCartItem = {
                    itemno:action.payload.product.itemno,
                    description:action.payload.product.description,
                    itemunit:action.payload.product.itemunit,
                    lineamount:(action.payload.product.unitprice*action.payload.quantity),
                    unitprice:action.payload.product.unitprice,
                    lineno:state.length*1000,
                    quantity:action.payload.quantity
                }
                return[...state,{...newCartItem}]
            }
        case actionTypes.Remove_From_Cart : 
            const newState = state.filter(cartItem => cartItem.itemno !== action.payload.product.itemno)
            return newState
        case actionTypes.Get_Cart_List :
            return action.payload;
        default: return state
    }
}
