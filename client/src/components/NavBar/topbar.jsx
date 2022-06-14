import React from "react";
import "../../styles/topBar.css";
import { Link } from "react-router-dom";

const Topbar = () => {
  const handleDisplay = () => {
    let display = document.querySelector(".top-bar");
    let $burger = document.querySelector(".burger");
    let $closed = document.querySelector(".closed");

    if (!$burger.classList.contains("ds-none")) {
      $burger.classList.add("ds-none");
      $closed.classList.remove("ds-none");
      display.style.display = "block";
    } else if (!$closed.classList.contains("ds-none")) {
      $closed.classList.add("ds-none");
      $burger.classList.remove("ds-none");
      display.style.display = "none";
    }
  };

  return (
    <div className="top-bar-contain">
      <div className="burger-menu">
        <i className="fas fa-bars burger" onClick={handleDisplay}></i>
        <i className="fas fa-times closed ds-none" onClick={handleDisplay}></i>
      </div>
      <div className="top-bar">
        <div className="avatar-contain">
          <img
            className="imag-avatar"
            src="/web-developer-design-vector-5884837.jpg"
            alt=""
          />
          <p>Marcos Britos</p>
        </div>
        <ul className="list-btn-navbar">
          <li className="item-navbar">
            <Link to="/">
              <i className="fa fa-fw fa-home"></i> Inicio
            </Link>
          </li>
          <li className="item-navbar">
            <Link to="/subjects">
              <i className="fas fa-book-reader"></i> Materias
            </Link>
          </li>
          <li className="item-navbar">
            <Link to="/user/profile/6290328166920c04f471eb98">
              <i className="fa fa-fw fa-user"></i> Perfil
            </Link>
          </li>
          <li className="item-navbar">
            <Link to="#contact">
              <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Topbar;
