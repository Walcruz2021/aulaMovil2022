import { types } from '../types/types';

const initialState =  {
    email : localStorage.getItem('email') || ""
};
console.log(initialState)

const AuthReducer = (state = initialState, action) => {
    switch(action.type){
        case types.authLogin:
            return{
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default AuthReducer;
