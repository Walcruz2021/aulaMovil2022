import React from "react";

const ChangePassword = () => {
  const inputsDisabledPassowrd = ()=>{
    let $input = document.querySelectorAll('input')
    $input.forEach((a, i)=>{
      if (i < 8 ) {
        return
      }
      a.disabled = false
    })
    document.querySelector('#edit-password-user').style.display = 'none'
    document.querySelector('#submit-password-user').style.display = 'block'
  
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    if (e.target.id === "edit-password-user") {
      inputsDisabledPassowrd()
    }
  }
  return (
    <div className="form-password">
      <form className="password-form" onClick={handleSubmit}>
        <div className="input-password">
          <label htmlFor="actually">Contraseña Actual</label>
          <input type="password" id="actually" name="password" disabled />
        </div>
        <div className="input-password">
          <label htmlFor="new">Nueva Contraseña</label>
          <input type="password" id="new" name="newPassword" disabled />
        </div>
        <div className="input-password">
          <label htmlFor="re-password">Repetir Contraseña</label>
          <input type="password" id="re-password" name="rePassword" disabled />
        </div>
        <div className="button-container">
          <button id="edit-password-user">Editar</button>
          <button id="submit-password-user" type="submit">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
