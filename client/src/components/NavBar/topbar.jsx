import React from "react";
import "../../styles/topBar.css";
import { Link } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux"
import { logout } from "../../actions/authLogin";
import { useEffect } from "react";

const Topbar = ({user}) => {
  const student = useSelector(state => state.auth.student)
  const users = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
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

  const handleClick = (e)=>{
    dispatch(logout())
  }
  useEffect(() => {

  }, [student]);

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
            src={ student.avatar ? student.avatar : '/default-image-avatar.jpg'}
            alt=""
          />
          <p>{student.firstName ? student.firstName : users.email}</p>
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
            <Link to={`/user/profile/${user.id}`}>
              <i className="fa fa-fw fa-user"></i> Perfil
            </Link>
          </li>
          <li className="item-navbar">
            <Link to="/" onClick={handleClick}>
              <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Topbar;
