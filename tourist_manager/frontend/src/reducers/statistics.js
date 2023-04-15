import {GET_STATISTICS} from "../actions/types.js"

const initialState = {
    vehiclesforstatistics: []
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_STATISTICS:
            return{
                ...state,
                vehiclesforstatistics: action.payload,
            };
        default:
            return state;
    
    }
}