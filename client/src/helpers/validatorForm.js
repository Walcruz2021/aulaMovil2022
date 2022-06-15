export const validateLogin =(email, password, state, setState)=>{
    let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/,
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
    let msg = state
    let error = [false, false]
    
    switch (true) {
        case !email.trim():
            msg.emailError = "Ingrese una Email"
            error[0] = true
            break; 
            case !regExEmail.test(email.trim()):
            msg.emailError = "Inserte un email valido"
            error[0] = true    
            break; 
        default:
            msg.emailError = ""
            error[0] = false
            break; 
    }

    switch (true) {
        case !password.trim():
            msg.passError = "Ingrese una contraseña"
            error[1] = true
            break; 
        case !regExPass.test(password.trim()):
            msg.passError = "La contraseña debe tener: entre 6 o 12 caracteres, al menos una mayúscula, una minúscula y un número."
            error[1] = true
            break;
        default:
            msg.passError = ""
            error[1] = false
            break; 
    }

    setState(msg)
    return error  
}


export const validateRegister = (email, password, password2,  state, setState)=>{
    let error = [false, false, false]
    let msg = state

    let [mens, err1] = emailF(email)
    msg.emailError = mens
    error[0] = err1

    let [mens2, err2] = passwordF(password)
    msg.passError = mens2
    error[1] = err2

    let [mens3, err3] = verifyPassword(password, password2)
    msg.RepassError = mens3
    error[2] = err3
    console.log(password)
    console.log(password2)
    setState(msg)
    return error
}


const emailF = (email)=>{
    let mens
    let regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
    let err1 = false
    switch (true) {
        case !email.trim():
            mens = "Ingrese una Email"
            err1 = true;
            break;
        case !regExEmail.test(email.trim()):
            mens = "Inserte un email valido"
            err1 = true
            break;
        default:
            err1 = false
            mens = ""
            break;
    }
    return [mens, err1]
}

const passwordF = ( password)=>{
    let mens2
    let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/
    let err2 = false
    switch (true) {
        case !password.trim():
            mens2 = "Ingrese una contraseña"
            err2 = true
            break; 
        case !regExPass.test(password.trim()):
            mens2 = "La contraseña debe tener: entre 6 o 12 caracteres, al menos una mayúscula, una minúscula y un número."
            err2 = true
            break; 
        default:
            mens2 = ""
            err2 = false
            break; 
    }

    return [mens2, err2]
}

const verifyPassword = (password1 , password2)=>{
    let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/
    let err3 = false
    let mens3;
    console.log(password1)
    console.log(password2)
    switch (true) {
        case !password2.trim():
            mens3 = "Ingrese una contraseña"
            err3 = true
            break; 
        case !regExPass.test(password2.trim()):
            mens3 = "La contraseña debe tener: entre 6 o 12 caracteres, al menos una mayúscula, una minúscula y un número."
            err3 = true
            break; 
        case password1 !== password2:
            mens3 = "Las contraseñas deben ser iguales"
            err3 = true
            break; 
        default:
            mens3 = ""
            err3 = false
            break; 
    }

    return [mens3, err3]
}