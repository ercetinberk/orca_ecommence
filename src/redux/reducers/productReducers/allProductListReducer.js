import * as actionTypes from '../../actions/actionTypes'
import initialState from '../initialState'
export default function allProductListReducer(state=initialState.allProducts,action){
    switch(action.type){
        case actionTypes.Get_All_Search_Products_Success :
            return action.payload;
        default:
            return state;
    }
}