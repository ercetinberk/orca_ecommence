import * as actionTypes from '../../actions/actionTypes'
import initialState from '../initialState'

export default function changeSearchReducer(state=initialState.search,action){
    switch(action.type){
        case actionTypes.Change_Saerch :
            return action.payload;
        default:
            return state;
    }
}