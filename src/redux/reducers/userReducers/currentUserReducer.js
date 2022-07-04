import * as actionTypes from '../../actions/actionTypes'
import initialState from '../initialState'

export function currentUserReducer(state=initialState.currentUser,action){
    switch(action.type){
        case actionTypes.Login_User_Success :
            return action.payload;
        default:
            return state;
    }
}
export function currentUserErrorReducer(state=initialState.loginError,action){
    switch(action.type){
        case actionTypes.Login_User_Error :
            return action.payload;
        default:
            return state;
    }
}

