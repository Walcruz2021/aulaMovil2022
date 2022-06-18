import { types } from "../types/types";

export const startLogin = (data)=>{
    let parse = {
        id : data.user._id,
        email : data.user.username,
        token : data.token
    }
    return (dispatch)=>{
        localStorage.setItem('userNoClassroom', JSON.stringify(parse))
        dispatch(login({
            user : parse
        }))
    }

}

export const logout= ()=>{
    return(dispatch)=>{
        localStorage.removeItem('userNoClassroom')
        dispatch({
            type : types.authLogout
        })
    }
}

const login = (user)=>({
    type : types.authLogin,
    payload : user
})
