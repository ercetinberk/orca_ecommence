import * as actionTypes from '../../actions/actionTypes'
import initialState from '../initialState'

export default function productListReducer(state=initialState.products,action){
    switch(action.type){
        case actionTypes.Get_All_Products_Success :
            return action.payload;
        default:
            return state;
    }
}

