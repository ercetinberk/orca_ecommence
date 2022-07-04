import * as actionTypes from '../../actions/actionTypes'
import initialState from '../initialState'

export default function countryReducer(state=initialState.countryList,action){
    switch(action.type){
        case actionTypes.Get_All_Country_Success :
            return action.payload;
        default:
            return state;
    }
}