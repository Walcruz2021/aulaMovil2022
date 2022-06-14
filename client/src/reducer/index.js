import {combineReducers} from "redux";
import authReducer from './authReducer';
// import { GET_CONTACTS } from "./actions";


// const initialState = {
//     allTurnos: []
    
// }

// function rootReducer(state = initialState, action) {
//     console.log(action.payload, "reducer")
//     //imprmiira esto de abajao,dependiendo de la accion que se haya elegido
//     //Object { type: "GET_RECIPE", payload: (13) […] }
//     switch (action.type) {
//         case GET_CONTACTS:

//             return {
//                 ...state,
//                 allTurnos: action.payload
               
//             }

       

//         default:
//             return state

//     }

// }

export const rootReducer = combineReducers({
    auth : authReducer
})