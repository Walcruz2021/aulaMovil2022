import React from "react";
import SelectCountry from "./SelectCountry";
import SelectProvince from "./SelectProvince";


const DataUser = ({data}) => {
  const inputsDisabled = ()=>{
    let $input = document.querySelectorAll('input')
    let $select = document.querySelectorAll('select')
    $input.forEach((a, i)=>{
      if (i > 7 ) {
        return
      }
      a.disabled = false
    })
    $select.forEach((a)=>{
      a.disabled = false
    })
    document.querySelector('#edit-data-user').style.display = 'none'
    document.querySelector('#submit-data-user').style.display = 'block'
  
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    if (e.target.id === "edit-data-user") {
      inputsDisabled()
    }
    
  }
  return (
    <div className="data-user-container">
      <form action="" method="POST" className="data-form" onClick={handleSubmit}>
        <div className="input-profile">
          <label htmlFor="name">Nombres</label>
          <input type="text" id="name" name="name" disabled value={data.firstName}/>
        </div>
        <div className="input-profile">
          <label htmlFor="surname">Apellido</label>
          <input type="text" id="surname" name="surname" disabled  value={data.lastName}/>
        </div>
        <div className="input-profile">
          <label htmlFor="DNI">Nº Documento</label>
          <input type="number" id="DNI" name="dni" disabled  value={data.dni}/>
        </div>
        <div className="input-profile">
          <label htmlFor="date">Fecha de Nacimiento</label>
          <input type="date" id="date" name="dateBirth" disabled  />
        </div>
        <div className="input-profile">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" disabled value={data.email}/>
        </div>
        <div className="input-profile">
          <label htmlFor="phone">Télefono</label>
          <input type="number" id="phone" name="phone" disabled value={data.phone}/>
        </div>
        <div className="input-profile">
          <label htmlFor="address">Dirección</label>
          <input type="text" id="address" name="address" disabled value={data.address}/>
        </div>
        <SelectCountry country={data.country}/>
        <SelectProvince province={data.province}/>
        <div className="button-container">
          <button id="edit-data-user">Editar</button>
          <button id="submit-data-user" type="submit">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default DataUser;
