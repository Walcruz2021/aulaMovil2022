import React from "react";
import { Link } from "react-router-dom";
import "../../styles/sideBar.css";
import { useDispatch } from "react-redux"
import { logout } from "../../actions/authLogin";
const SideBar = ({user}) => {
  
  const dispatch = useDispatch()

  const handleClick = ()=>{
    dispatch(logout())
  }
  return (
    <div className="sidebar">
      <div className="page-name">
        <img src="/web-developer-design-vector-5884837.jpg" alt="" />
        <h5>No Classroom C5-G30</h5>
      </div>
      <div className="nav-item">
        <Link to="/">
          <i className="fa fa-fw fa-home"></i> Inicio
        </Link>
        <Link to="/subjects">
          <i className="fas fa-book-reader"></i> Materias
        </Link>
        <Link to={`/user/profile/${user.id}`}>
          <i className="fa fa-fw fa-user"></i> Perfil
        </Link>
        <Link to="" onClick={handleClick}>
          <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
