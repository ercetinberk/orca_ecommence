import * as actionTypes from '../../actions/actionTypes'
import initialState from '../initialState'

export default function productCountReducer(state=initialState.productCount,action){
    switch(action.type){
        case actionTypes.Get_Products_Success_DataCount :
            return action.payload;
        default:
            return state;
    }
}

