import React from "react";
import host from "../../helpers/host";
import UseFetchPost from "../../hooks/useFetchPost";
import Swal from "sweetalert2";
import SelectProvince from "./SelectProvince";
import { useDispatch } from "react-redux";
import { getStudent } from "../../reducer/actions";
import { useState } from "react";
import { validateProfile } from "../../helpers/validatorForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DataUser = ({
  data,
  email,
  id,
  setLoader,
  scrollEnable,
  scrollDisabled,
}) => {
  const [Error, setError] = useState({
    errFirstName: "",
    errLastName: "",
    errDni: "",
    errUsername: "",
    errPhone: "",
    errAddress: "",
    errProvice: "",
    errdateNac: "",
    resError: "",
  });
  const [ExistError, setExistError] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [disabled, setdisabled] = useState(true);
  const [scrollLoad, setscrollLoad] = useState('0px');
  const dispatch = useDispatch();
  let dataUser = data;
  const navigate = useNavigate();

  function inputsDisabled() {
    let $input = document.querySelectorAll("input");
    setdisabled(false);
    $input.forEach((a, i) => {
      if (i > 7) {
        return;
      }
      a.disabled = false;
    });
    document.querySelector("#edit-data-user").style.display = "none";
    document.querySelector("#submit-data-user").style.display = "block";
  }

  const inputsDisabledOn = () => {
    let $input = document.querySelectorAll("input");
    let $select = document.querySelectorAll("select");
    $input.forEach((a, i) => {
      if (i > 7) {
        return;
      }
      a.disabled = true;
    });
    $select.forEach((a) => {
      a.disabled = true;
    });
    document.querySelector("#edit-data-user").style.display = "block";
    document.querySelector("#submit-data-user").style.display = "none";
    setdisabled(true);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.id === "edit-data-user") {
      inputsDisabled();
    }
  };

  const apiPut = async (values) => {
    let resolve = await UseFetchPost(
      `${host.development}/stu/editStudents/${id}`,
      values,
      "put"
    );
    if (resolve.data.msg === "usuario actualizado") {
      setLoader(false)
      scrollEnable();
      Swal.fire({
        icon: "success",
        title: `Datos actualizados correctamente`,
        showConfirmButton: false,
        timer: 1500,
      });
      inputsDisabledOn();
      dispatch(getStudent(values));
      navigate(`/user/profile/${id}`);
      return
    }
    setLoader(false)
    scrollEnable();
    
  };
  const handleScroll = () => {
    window.addEventListener('scroll', ()=>{
      setscrollLoad(`${window.scrollY}px`)
    })
  };
  handleScroll()
  const handleSubmit = (e) => {
    setLoader(true);
    scrollDisabled();
    let avatar = JSON.parse(sessionStorage.getItem("student"));
    e.preventDefault();
    let $form = document.querySelector(".data-form");
    let valueForm = {
      firstName: $form.elements.firstName.value,
      lastName: $form.elements.lastName.value,
      dni: $form.elements.dni.value,
      username: $form.elements.email.value,
      phone: $form.elements.phone.value,
      address: $form.elements.address.value,
      province: $form.elements.province.value,
      avatar: avatar.avatar,
      cohorte: avatar.cohorte,
      dateNac: $form.elements.dateBirth.value,
      status: true,
    };
    let valuesObj = Object.values(valueForm);

    if (valueForm.province !== "") {
      setError({
        ...Error,
        errProvice: "",
      });
      let allError = ExistError;
      allError[7] = false;
      setExistError(allError);
    }
    if (ExistError.includes(true) || valuesObj.includes("")) {
      if (valueForm.province === "") {
        setError({
          ...Error,
          errProvince: "Ingrese su provincia",
        });
        let allError = ExistError;
        allError[7] = true;
        setExistError(allError);
      }
      setError({
        ...Error,
        resError: "Complete todos los campos",
      });
      setLoader(false);
      scrollEnable();
      navigate(`/user/profile/${id}`);
      return;
    }

    setError({
      ...Error,
      resError: "",
    });

    apiPut(valueForm);
  };

  const handleBlur = (e) => {
    validateProfile(e.target, Error, setError, ExistError, setExistError);
    navigate(`/user/profile/${id}`);
  };
  
  useEffect(() => {
    let load = document.querySelector('.loader-container')
    if (load) {
      load.style.top = scrollLoad
    }
    
  }, [Error]);
  return (
    <div className="data-user-container" id="data-user">
      <form
        action=""
        method="POST"
        className="data-form"
        onSubmit={handleSubmit}
      >
        <div className="input-profile">
          <label htmlFor="name">Nombres</label>
          <input
            type="text"
            id="name"
            name="firstName"
            className={`${Error.errFirstName.length > 0 ? "invalid" : ""}`}
            disabled
            defaultValue={dataUser.firstName}
            onBlur={handleBlur}
          />
          <span className="danger-msg">{Error.errFirstName}</span>
        </div>
        <div className="input-profile">
          <label htmlFor="surname">Apellido</label>
          <input
            type="text"
            id="surname"
            name="lastName"
            className={`${Error.errLastName.length > 0 ? "invalid" : ""}`}
            disabled
            defaultValue={dataUser.lastName}
            onBlur={handleBlur}
          />
          <span className="danger-msg">{Error.errLastName}</span>
        </div>
        <div className="input-profile">
          <label htmlFor="DNI">Nº Documento</label>
          <input
            className={`${Error.errDni.length > 0 ? "invalid" : ""}`}
            type="number"
            id="DNI"
            name="dni"
            disabled
            defaultValue={dataUser.dni}
            onBlur={handleBlur}
          />
          <span className="danger-msg">{Error.errDni}</span>
        </div>
        <div className="input-profile">
          <label htmlFor="date">Fecha de Nacimiento</label>
          <input
            className={`${Error.errdateNac.length > 0 ? "invalid" : ""}`}
            type="date"
            id="date"
            name="dateBirth"
            defaultValue={dataUser.dateNac}
            disabled
            onBlur={handleBlur}
          />
          <span className="danger-msg">{Error.errdateNac}</span>
        </div>
        <div className="input-profile">
          <label htmlFor="email">Email</label>
          <input
            className={`${Error.errUsername.length > 0 ? "invalid" : ""}`}
            type="text"
            id="email"
            name="email"
            disabled
            defaultValue={email}
            onBlur={handleBlur}
          />
          <span className="danger-msg">{Error.errUsername}</span>
        </div>
        <div className="input-profile">
          <label htmlFor="phone">Télefono</label>
          <input
            className={`${Error.errPhone.length > 0 ? "invalid" : ""}`}
            type="number"
            id="phone"
            name="phone"
            disabled
            defaultValue={dataUser.phone}
            onBlur={handleBlur}
          />
          <span className="danger-msg">{Error.errPhone}</span>
        </div>
        <div className="input-profile">
          <label htmlFor="address">Dirección</label>
          <input
            className={`${Error.errAddress.length > 0 ? "invalid" : ""}`}
            type="text"
            id="address"
            name="address"
            disabled
            defaultValue={dataUser.address}
            onBlur={handleBlur}
          />
          <span className="danger-msg">{Error.errAddress}</span>
        </div>
        <SelectProvince
          province={dataUser.province}
          disabled={disabled}
          selectError={Error.errProvice}
        />
        <div className="button-container">
          <button id="edit-data-user" onClick={handleClick}>
            Editar
          </button>
          <button id="submit-data-user" type="submit">
            Guardar
          </button>
          <span className="danger-msg-form">{Error.resError}</span>
        </div>
      </form>
    </div>
  );
};

export default DataUser;
