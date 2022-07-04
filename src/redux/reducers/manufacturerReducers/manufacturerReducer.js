import * as actionTypes from '../../actions/actionTypes'
import initialState from '../initialState'

export default function manufacturerReducer(state=initialState.manufacturerList,action){
    switch(action.type){
        case actionTypes.Get_All_Manufacturer_Success :
            return action.payload;
        default:
            return state;
    }
}