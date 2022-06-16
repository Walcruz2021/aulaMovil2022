import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Log.css";
import { useDispatch } from "react-redux";
import { startLogin } from "../actions/authLogin";
import UseFetchPost from "../hooks/useFetchPost";
import host from "../helpers/host";
import { validateLogin, validateRegister } from "../helpers/validatorForm";
import { useEffect } from "react";

export default function LoginInRegister({ isLogin }) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorMsg, seterrorMsg] = useState({
    emailError: "",
    passError: "",
    RepassError : "",
    resError : ""
  });

  const [form, SetForm] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const postApi = async (keyword)=>{
    if (isLogin) {
      //let data = await UseFetchPost(`${host.development}/stu/login`, keyword);
      let data = await UseFetchPost(`/stu/login`, keyword);
      if (data.status === 200) {
        dispatch(startLogin(data.data));
        navigate("/");
      } else {
        seterrorMsg({resError : "Contraseña o email incorrectos"})
      }
    } else {
      let data = await UseFetchPost(
        //`${host.development}/stu/register`,
        `/stu/register`,
        keyword
      );
      if (data.status === 200) {
        navigate("/login");
      }
    }
  }
  const HandleChange = (e) => {
    e.preventDefault();
    SetForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur= () => {
    isLogin ? validateLogin(form.email, form.password, errorMsg, seterrorMsg) : validateRegister(form.email, form.password, form.password2, errorMsg, seterrorMsg)
    isLogin ? navigate("/login") : navigate("/register");
  };

  const HandleSubmit = (e) => {
    let keyword = {
      username: e.target[0].value,
      password: e.target[1].value,
      password2: e.target[2].value,
    };
    let error = isLogin ? validateLogin(
      keyword.username,
      keyword.password,
      errorMsg,
      seterrorMsg
    ) : validateRegister(keyword.username,
      keyword.password,
      keyword.password2,
      errorMsg,
      seterrorMsg);
    isLogin ? navigate("/login") : navigate("/register");
    e.preventDefault();

    if (!error.includes(true)) {
      postApi(keyword)
    }
  };
  console.log(errorMsg.emailError.length)
  useEffect(() => {}, [errorMsg]);

  return (
    <div id="login-background">
      <form id="login-body" onSubmit={HandleSubmit}>
        <h2>{isLogin ? "Ingresa" : "Registrate"}</h2>
        <div className="input-contain-login">
          <div id="log-input-field-holder">
            <h6>Email</h6>
            <input
              type="text"
              className={`log-input-field ${ errorMsg.emailError.length > 0 ? "invalid" : ""}`}
              name="email"
              value={form.email}
              onBlur={handleBlur}
              onChange={(e) => HandleChange(e)}
            />
            <span className="danger-msg">{errorMsg.emailError}</span>
          </div>
          <div id="log-input-field-holder">
            <h6>Contraseña</h6>
            <input
              type="password"
              className={`log-input-field ${ errorMsg.passError.length > 0 ? "invalid" : ""}`}
              name="password"
              value={form.password}
              onChange={(e) => HandleChange(e)}
              onBlur={handleBlur}
            />
            <span className="danger-msg">{errorMsg.passError}</span>
          </div>
          {!isLogin ? (
            <div id="log-input-field-holder">
              <h6>Confirmar contraseña</h6>
              <input
                type="password"
                className={`log-input-field ${ errorMsg.RepassError.length > 0 ? "invalid" : ""}`}
                name="password2"
                value={form.password2}
                onChange={(e) => HandleChange(e)}
                onBlur={handleBlur}
              />
              <span className="danger-msg">{errorMsg.RepassError}</span>
            </div>
          ) : (
            ""
          )}
        </div>
        <span className="danger-msg">{errorMsg.resError}</span>
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
