import * as actionTypes from '../../actions/actionTypes'
import initialState from '../initialState'

export default function settingReducer(state=initialState.settings,action){
    switch(action.type){
        case actionTypes.Get_All_Settings_Success :
            return action.payload;
        default:
            return state;
    }
}