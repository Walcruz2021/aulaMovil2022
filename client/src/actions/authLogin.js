import { types } from "../types/types";

export const startLogin = (email, password)=>{
    return (dispatch)=>{
        localStorage.setItem('email', email)
        dispatch(login({
            name : 'usuario',
            email,
        }))
    }

}

const login = (user)=>({
    type : types.authLogin,
    payload : user
})