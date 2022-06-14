import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import "../styles/Log.css";
import { useDispatch, useSelector } from 'react-redux'
import { startLogin } from '../actions/authLogin'

export default function LoginInRegister({ isLogin }) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, SetForm] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const HandleError = () => {
    let error = [];
    if (form.email === "") error.push("El mail no puede estar vacio");
    if (!form.password) error.push("La contraseña no puede estar vacia");
    else if (form.password !== form.password2)
      error.push("Las contraseñas no coinciden");
    else if (form.password.length < 8)
      error.push("La contraseña debe tener al menos 8 caracteres");
    else if (form.password.length > 16)
      error.push("La contraseña no debe tener mas de 16 caracteres");
    return error;
  };
  const estado = useSelector((state) => state);
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin) {
      let temp = HandleError();
      if (temp.length > 0) {
        alert(temp.map((e) => e + "\n"));
      } else {
        alert(
          `Nuevo usuario creado\nMail: ${form.email}\nPassword: ${form.password}\nPassword2: ${form.password2}`
        );
        SetForm({
          email: "",
          password: "",
          password2: "",
        });
      }
    } else alert("Iniciando sesion");

    dispatch(startLogin(e.target[0].value, e.target[1].value))
    
    
    if (estado.auth.email !== "") {
      navigate('/')
    }
    
  };

  const HandleChange = (e) => {
    e.preventDefault();
    SetForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div id="login-background">
      <form id="login-body" onSubmit={HandleSubmit}>
        <h2>{isLogin ? "Ingresa" : "Registrate"}</h2>
        <div className="input-contain-login">
          <div id="log-input-field-holder">
            <h6>Email</h6>
            <input
              type="text"
              id="log-input-field"
              name="email"
              value={form.email}
              onChange={(e) => HandleChange(e)}
            />
          </div>
          <div id="log-input-field-holder">
            <h6>Contraseña</h6>
            <input
              type="password"
              id="log-input-field"
              name="password"
              value={form.password}
              onChange={(e) => HandleChange(e)}
            />
          </div>
          {!isLogin ? (
            <div id="log-input-field-holder">
              <h6>Confirmar contraseña</h6>
              <input
                type="password"
                id="log-input-field"
                name="password2"
                value={form.password2}
                onChange={(e) => HandleChange(e)}
              />
            </div>
          ) : (
            ""
          )}
        </div>

        <input
          type="submit"
          value={isLogin ? "Iniciar sesion" : "Registrate"}
          id="log-input-button"
        ></input>
        <div className="link-container-register-login">
          <Link to={isLogin ? "/register" : "/login"}>
            {isLogin
              ? "No tienes cuenta? Registrate"
              : "Tienes Cuenta? Inicia Sesión"}
          </Link>
          <a href="/">{isLogin ? "¿Olvidaste tu contraseña?" : ""}</a>
        </div>
      </form>
    </div>
  );
}
