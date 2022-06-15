import React from "react";
import host from "../../helpers/host";
import UseFetchPost from "../../hooks/useFetchPost";
import Swal from "sweetalert2";
import SelectProvince from "./SelectProvince";
import { useDispatch } from "react-redux";
import { getStudent } from "../../reducer/actions";
import { useState } from "react";


const DataUser = ({ data, email, id }) => {
  const [disabled, setdisabled] = useState(true);
  const dispatch = useDispatch();
  let dataUser = data;

  function inputsDisabled () {
    let $input = document.querySelectorAll("input");
    setdisabled(false) 
    $input.forEach((a, i) => {
      if (i > 7) {
        return;
      }
      a.disabled = false;
    });
    document.querySelector("#edit-data-user").style.display = "none";
    document.querySelector("#submit-data-user").style.display = "block";
  };

  

  const inputsDisabledOn = () => {
    let $input = document.querySelectorAll("input");
    let $select = document.querySelectorAll("select");
    $input.forEach((a, i) => {
      if (i > 8) {
        return;
      }
      a.disabled = true;
    });
    $select.forEach((a) => {
      a.disabled = true;
    });
    document.querySelector("#edit-data-user").style.display = "block";
    document.querySelector("#submit-data-user").style.display = "none";
    setdisabled(true) 

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
      Swal.fire({
        icon: "success",
        title: `Datos actualizados correctamente`,
        showConfirmButton: false,
        timer: 1500,
      });
      inputsDisabledOn()
      dispatch(getStudent(values))
    }
  };

  const handleSubmit = (e) => {
    let avatar = JSON.parse(sessionStorage.getItem('student'))
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
      avatar : avatar.avatar,
      cohorte : avatar.cohorte,
      dateNac : $form.elements.dateBirth.value,
      status : true
    };
    apiPut(valueForm);
  };


  return (
    <div className="data-user-container">
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
            disabled
            defaultValue={dataUser.firstName}
          />
        </div>
        <div className="input-profile">
          <label htmlFor="surname">Apellido</label>
          <input
            type="text"
            id="surname"
            name="lastName"
            disabled
            defaultValue={dataUser.lastName}
          />
        </div>
        <div className="input-profile">
          <label htmlFor="DNI">Nº Documento</label>
          <input
            type="number"
            id="DNI"
            name="dni"
            disabled
            defaultValue={dataUser.dni}
          />
        </div>
        <div className="input-profile">
          <label htmlFor="date">Fecha de Nacimiento</label>
          <input type="date" id="date" name="dateBirth" defaultValue={dataUser.dateNac} disabled />
        </div>
        <div className="input-profile">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            disabled
            defaultValue={email}
          />
        </div>
        <div className="input-profile">
          <label htmlFor="phone">Télefono</label>
          <input
            type="number"
            id="phone"
            name="phone"
            disabled
            defaultValue={dataUser.phone}
          />
        </div>
        <div className="input-profile">
          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            disabled
            defaultValue={dataUser.address}
          />
        </div>
        <SelectProvince province={dataUser.province} disabled={disabled} />
        <div className="button-container">
          <button id="edit-data-user" onClick={handleClick}>
            Editar
          </button>
          <button id="submit-data-user" type="submit">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default DataUser;
