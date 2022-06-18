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
    setState(msg)
    return error
}


const emailF = (email)=>{
    let mens
    let regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
    let err1 = false
    switch (true) {
        case !email.trim():
            mens = "Ingrese un Email"
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

export const validateProfile = (type, state, setState, exist, setExist)=>{
    let errors = state
    let error= exist
    switch (true) {
        case type.name === "firstName":
            let solu = validateName(type.value)
            errors.errFirstName = solu[0]
            error[0] = solu[1]
            break;
        case type.name === "lastName":
            let soluLast = validateName(type.value)
            errors.errLastName = soluLast[0]
            error[1] = soluLast[1]
            break;
        case type.name === "dni":
            let dni = validateDni(type.value)
            errors.errDni = dni[0] 
            error[2] = dni[1]
            break;
        case type.name === "email":
            let [mens, err1] = emailF(type.value)
            errors.errUsername = mens
            error[3] = err1
            break;
        case type.name === "address":
            let address = validateAddress(type.value)
            errors.errAddress = address[0]
            error[4] = address[1]
            break;
        case type.name === "phone":
            let phone = validatePhone(type.value)
            errors.errPhone = phone[0]
            error[5] = phone[1]
            break;
        case type.name === "dateBirth":
            let birth = validateDate(type.value)
            errors.errdateNac = birth[0]
            error[6] = birth[1]
            break;
        default:
            break;
    }
    setExist(error)
    setState(errors)
}

const validateName = (value)=>{
    let regExAlpha = /^[a-zA-Z\sñÑáÁéÉíÍóÓúÚü ]*$/;
    let msg ;
    let error = false
    switch (true) {
        case !value.trim():
            msg = "Ingrese su Nombre / Apellido"
            error = true
            break;
        case !regExAlpha.test(value.trim()):
            msg = "Ingrese un texto valido, no se permite numeros y caracteres especiales"
            error = true
            break;
    
        default:
            msg = ""
            error = false
            break;
    }
    return [msg, error]
}

const validateDni = (value)=>{
    let regExDNI = /^[0-9]{1,8}$/
    let msg;
    let error = false
    switch (true) {
        case !value.trim():
            msg = "Ingrese su DNI"
            error = true
            break;
        case !regExDNI.test(value.trim()):
            msg = "Ingrese un DNI valido, se permite solo números con un maximo de 8 numeros"
            error = true
            break;
        default:
            msg = ""
            error = false
            break;
    }
    return [msg, error]
}

const validateAddress = (value)=>{
    let regExAlphaNumeric = /^[a-zA-Z\sñÑáÁéÉíÍóÓúÚü1234567890., ]*$/
    let msg;
    let error = false
    switch (true) {
        case !value.trim():
            msg = "Ingrese un domicilio"
            error = true
            break;
        case !regExAlphaNumeric.test(value.trim()):
            error = true
            msg = "Ingrese un domicilio valido, 'example street 1234'"
            break;
        default:
            error = false
            msg = ""
            break;
    }
    return [msg, error]
}

const validatePhone= (value)=>{
    let error = false
    let regExPhone = /^[0-9]{7,10}$/
    let msg;
    switch (true) {
        case !value.trim():
            error = true
            msg = "Ingrese un número de télefono"
            break;
        case !regExPhone.test(value.trim()):
            error = true
            msg = "Ingrese un número de télefono valido"
            break;
        default:
            error = false
            msg = ""
            break;
    }
    return [msg, error]
}

const validateDate= (value)=>{
    let error = false
    let msg;
    switch (true) {
        case !value.trim():
            msg = "Ingrese una Fecha"
            error = true
            break;
        case new Date(value) > new Date():
            msg = "Ingrese una fecha valida"
            error = true
            break;
        default:
            error = false
            msg = ""
            break;
    }
    return [msg, error]
}


export const ValidateChangePassword =(type, state, setState, exist, setExist)=>{
    let errorsMsg = state
    let errorExist = exist

    switch (true) {
        case type.name === "password":
            let solu = passwordF(type.value)
            errorsMsg.errPass = solu[0]
            errorExist[0] = solu[1]  
            break;
        case type.name === "newPassword":
            let solu2 = passwordF(type.value)
            errorsMsg.errNewPass = solu2[0]
            errorExist[1] = solu2[1]  
            break;
        case type.name === "rePassword":
            let solu3 = passwordF(type.value)
            errorsMsg.errRePass= solu3[0]
            errorExist[2] = solu3[1]  
            break;
    
        default:
            break;
    }

    setState(errorsMsg)
    setExist(errorExist)
}

export const validatePasswords =(type, state, setState, exist, setExist)=>{
    let errorsMsg = state
    let errorExist = exist
    if (type.newPassword !== type.rePassword) {
        errorsMsg.resErr = "Las contraseñas no coinciden"
        errorExist[3] = true
    } else{
        errorsMsg.resErr = ""
        errorExist[3] = false
    }

    setState(errorsMsg)
    setExist(errorExist)
}
